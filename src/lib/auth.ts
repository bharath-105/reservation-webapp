import { adminAuth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) {
    redirect('/sign-in');
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const dbUser = await prisma.user.findUnique({
      where: { firebaseUid: decodedClaims.uid },
    });
    if (!dbUser) {
      redirect('/sign-in');
    }
    return dbUser;
  } catch (error) {
    redirect('/sign-in');
  }
}

export async function requireRole(allowedRoles: string[]) {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    redirect('/');
  }
  return user;
}
