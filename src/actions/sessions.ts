'use server';

import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getOrCreateSession(tableNumber: string) {
  const dbUser = await requireAuth();

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
  const dbUser = await requireAuth();

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
  const dbUser = await requireAuth();

  const request = await prisma.joinRequest.findFirst({
    where: { sessionId, userId: dbUser.id },
    orderBy: { createdAt: 'desc' }
  });

  return request?.status || null;
}

export async function getPendingRequests(sessionId: string) {
  const dbUser = await requireAuth();
  
  // Verify is host
  const session = await prisma.tableSession.findUnique({ where: { id: sessionId } });
  if (session?.hostId !== dbUser.id) return [];

  return prisma.joinRequest.findMany({
    where: { sessionId, status: 'PENDING' },
    include: { user: true }
  });
}

export async function resolveJoinRequest(requestId: string, status: 'APPROVED' | 'REJECTED') {
  const dbUser = await requireAuth();

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
