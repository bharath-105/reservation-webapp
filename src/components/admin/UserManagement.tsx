'use client';
import { useState } from 'react';
import { updateUserRole } from '@/actions/admin';

export default function UserManagement({ users }: { users: any[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setLoadingId(userId);
    try {
      await updateUserRole(userId, newRole);
    } catch (err) {
      alert('Failed to update role');
    }
    setLoadingId(null);
  };

  return (
    <div className="glass" style={{ padding: '32px', borderRadius: '24px', marginTop: '48px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>User Management & Roles</h2>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '16px', opacity: 0.7 }}>Name / Phone</th>
              <th style={{ padding: '16px', opacity: 0.7 }}>Joined</th>
              <th style={{ padding: '16px', opacity: 0.7 }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: 600 }}>{user.name || 'Anonymous User'}</div>
                  <div style={{ fontSize: '14px', opacity: 0.6 }}>{user.phone || 'No phone'}</div>
                </td>
                <td style={{ padding: '16px', opacity: 0.8 }}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '16px' }}>
                  <select 
                    value={user.role} 
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    disabled={loadingId === user.id}
                    style={{ 
                      padding: '8px 12px', 
                      borderRadius: '8px', 
                      background: 'rgba(255,255,255,0.1)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="CUSTOMER" style={{ color: 'black' }}>Customer</option>
                    <option value="WAITER" style={{ color: 'black' }}>Waiter</option>
                    <option value="KITCHEN" style={{ color: 'black' }}>Kitchen Staff</option>
                    <option value="CASHIER" style={{ color: 'black' }}>Cashier</option>
                    <option value="ADMIN" style={{ color: 'black' }}>Admin</option>
                  </select>
                  {loadingId === user.id && <span style={{ marginLeft: '10px', fontSize: '12px', color: 'var(--primary)' }}>Saving...</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
