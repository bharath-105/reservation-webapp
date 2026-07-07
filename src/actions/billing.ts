'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getActiveSessionsWithOrders() {
  return await prisma.tableSession.findMany({
    where: { status: 'ACTIVE' },
    include: {
      table: true,
      host: true,
      orders: {
        include: {
          items: { include: { menuItem: true } },
          user: true
        }
      }
    }
  });
}

export async function closeSessionAndBill(sessionId: string, paymentMethod: string) {
  const session = await prisma.tableSession.findUnique({
    where: { id: sessionId },
    include: { orders: true }
  });

  if (!session) throw new Error('Session not found');

  const totalAmount = session.orders.reduce((sum, order) => sum + order.totalAmount, 0);

  // Close session
  await prisma.tableSession.update({
    where: { id: sessionId },
    data: { status: 'CLOSED', closedAt: new Date() }
  });

  // Create payment record
  await prisma.payment.create({
    data: {
      sessionId,
      amount: totalAmount,
      method: paymentMethod,
      splitType: 'FULL',
      gstAmount: totalAmount * 0.05
    }
  });

  revalidatePath('/cashier');
}
