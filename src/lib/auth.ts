import { currentUser } from '@clerk/nextjs/server';
import { prisma } from './prisma';

export async function requireAuth() {
  const user = await currentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  // Ensure user exists in our DB
  const dbUser = await prisma.user.upsert({
    where: { clerkId: user.id },
    update: {},
    create: {
      clerkId: user.id,
      name: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : null,
      phone: user.phoneNumbers?.[0]?.phoneNumber || null,
      role: 'CUSTOMER'
    }
  });

  return dbUser;
}

export async function requireRole(allowedRoles: string[]) {
  const dbUser = await requireAuth();
  if (!allowedRoles.includes(dbUser.role) && dbUser.role !== 'ADMIN') {
    import('next/navigation').then((m) => m.redirect('/'));
  }
  return dbUser;
}
