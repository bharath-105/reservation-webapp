'use server';
import { requireRole } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateUserRole(userId: string, newRole: string) {
  // Only an ADMIN can change roles
  await requireRole(['ADMIN']);

  const validRoles = ['CUSTOMER', 'WAITER', 'KITCHEN', 'CASHIER', 'ADMIN'];
  if (!validRoles.includes(newRole)) {
    throw new Error('Invalid role');
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole }
  });

  revalidatePath('/admin');
  return { success: true };
}
