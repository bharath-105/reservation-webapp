import { redirect } from 'next/navigation';
import { getOrCreateSession } from '@/actions/sessions';
import JoinRequestUI from '@/components/table/JoinRequestUI';
import HostControls from '@/components/table/HostControls';

export const dynamic = 'force-dynamic';

export default async function TablePage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const resolvedParams = await searchParams;
  const tableId = resolvedParams.id;
  if (!tableId) return <div style={{ marginTop: '140px', textAlign: 'center' }}>Invalid Table QR Code</div>;

  let sessionData;
  try {
    sessionData = await getOrCreateSession(tableId);
  } catch (error) {
    // If ensureUser throws, meaning they aren't logged in, redirect to clerk sign-in
    redirect(`/sign-in?redirect_url=/table?id=${tableId}`);
  }

  const { session, isHost } = sessionData;

  return (
    <div className="glass" style={{ maxWidth: '600px', margin: '140px auto', padding: '64px 32px', textAlign: 'center', borderRadius: '24px' }}>
      <div style={{ fontSize: '64px', marginBottom: '24px' }}>🍽️</div>
      <h1 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-1px', marginBottom: '16px' }}>
        Table {tableId}
      </h1>
      <p style={{ opacity: 0.7, fontSize: '18px', marginBottom: '40px' }}>
        {isHost ? "You are the primary host for this table." : "You are joining a shared table session."}
      </p>

      {isHost ? (
        <HostControls session={session} />
      ) : (
        <JoinRequestUI session={session} />
      )}
    </div>
  );
}
