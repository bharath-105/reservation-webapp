import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/sign-in');
  }

  // Get or create user in Prisma
  let dbUser = await prisma.user.findUnique({
    where: { supabaseUid: user.id }
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        supabaseUid: user.id,
        phone: user.phone || user.email,
        name: user.user_metadata?.name || 'Customer'
      }
    });
  }

  return dbUser;
}

export async function requireRole(allowedRoles: string[]) {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    redirect('/');
  }
  return user;
}
