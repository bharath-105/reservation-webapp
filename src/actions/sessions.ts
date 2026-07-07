'use server';

import { adminAuth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

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
  const dbUser = await prisma.user.upsert({
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

  return dbUser;
}

export async function getOrCreateSession(tableNumber: string) {
  const dbUser = await ensureUser();

  // Ensure table exists
  const table = await prisma.table.upsert({
    where: { number: tableNumber },
    update: {},
    create: { number: tableNumber },
  });

  // Check for active session
  let session = await prisma.tableSession.findFirst({
    where: { tableId: table.id, status: 'ACTIVE' },
    include: { host: true }
  });

  if (!session) {
    // Become the host
    session = await prisma.tableSession.create({
      data: {
        tableId: table.id,
        hostId: dbUser.id,
      },
      include: { host: true }
    });
  }

  return {
    session,
    isHost: session.hostId === dbUser.id,
    user: dbUser
  };
}

export async function requestToJoin(sessionId: string) {
  const dbUser = await ensureUser();

  const existingRequest = await prisma.joinRequest.findFirst({
    where: { sessionId, userId: dbUser.id },
  });

  if (!existingRequest) {
    await prisma.joinRequest.create({
      data: {
        sessionId,
        userId: dbUser.id,
        status: 'PENDING',
      },
    });
  }
  
  revalidatePath('/table');
}

export async function getMyJoinStatus(sessionId: string) {
  const dbUser = await ensureUser();

  const request = await prisma.joinRequest.findFirst({
    where: { sessionId, userId: dbUser.id },
    orderBy: { createdAt: 'desc' }
  });

  return request?.status || null;
}

export async function getPendingRequests(sessionId: string) {
  const dbUser = await ensureUser();
  
  // Verify is host
  const session = await prisma.tableSession.findUnique({ where: { id: sessionId } });
  if (session?.hostId !== dbUser.id) return [];

  return prisma.joinRequest.findMany({
    where: { sessionId, status: 'PENDING' },
    include: { user: true }
  });
}

export async function resolveJoinRequest(requestId: string, status: 'APPROVED' | 'REJECTED') {
  const dbUser = await ensureUser();

  const request = await prisma.joinRequest.findUnique({
    where: { id: requestId },
    include: { session: true }
  });

  if (request?.session.hostId !== dbUser.id) {
    throw new Error('Unauthorized: Not the host');
  }

  await prisma.joinRequest.update({
    where: { id: requestId },
    data: { status },
  });
  
  revalidatePath('/table');
}
