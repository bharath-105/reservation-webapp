'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { adminAuth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';

async function ensureUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) {
    throw new Error('Unauthorized');
  }

  let decodedClaims;
  try {
    decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
  } catch (error) {
    throw new Error('Unauthorized');
  }

  const firebaseUid = decodedClaims.uid;
  const phone = decodedClaims.phone_number || null;

  // Create or update the user in our database
  return await prisma.user.upsert({
    where: { firebaseUid },
    update: {
      phone: phone,
    },
    create: {
      firebaseUid,
      name: 'Guest',
      phone: phone,
    },
  });
}

export async function createOrder(sessionId: string, items: { id: string, price: number, quantity: number }[]) {
  const dbUser = await ensureUser();
  const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const order = await prisma.order.create({
    data: {
      sessionId,
      userId: dbUser.id,
      totalAmount,
      items: {
        create: items.map(item => ({
          menuItemId: item.id,
          quantity: item.quantity
        }))
      }
    }
  });
  return order.id;
}

export async function getOrder(orderId: string) {
  return await prisma.order.findUnique({
    where: { id: orderId },
    include: { 
      items: {
        include: { menuItem: true }
      } 
    }
  });
}

export async function getActiveOrders() {
  // Used by Kitchen Display System
  return await prisma.order.findMany({
    where: { status: { in: ['PENDING', 'ACCEPTED', 'PREPARING', 'READY'] } },
    include: { 
      items: { include: { menuItem: true } },
      session: { include: { table: true } },
      user: true
    },
    orderBy: { createdAt: 'asc' }
  });
}

export async function updateOrderStatus(orderId: string, status: string) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status }
  });
  revalidatePath('/staff');
  revalidatePath(`/order/${orderId}`);
}

export async function submitRatings(ratings: { itemId: string, rating: number }[]) {
  for (const r of ratings) {
    await prisma.orderItem.update({
      where: { id: r.itemId },
      data: { rating: r.rating }
    });
  }
}
