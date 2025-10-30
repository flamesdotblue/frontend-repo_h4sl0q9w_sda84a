import { useEffect, useMemo, useState } from 'react';

function Section({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-sm font-semibold text-slate-800">{title}</div>
      <div className="mt-2 text-sm text-slate-600">{children}</div>
    </div>
  );
}

export default function Dashboard({ role }) {
  const [profile, setProfile] = useState(null);
  const baseURL = useMemo(() => import.meta.env.VITE_BACKEND_URL || '', []);

  useEffect(() => {
    const token = localStorage.getItem('tp_token');
    if (!token) return;
    fetch(`${baseURL}/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setProfile)
      .catch(() => {});
  }, [baseURL]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">Dashboard</div>
            <h1 className="text-2xl font-semibold text-slate-900">{role.charAt(0).toUpperCase()+role.slice(1)} Overview</h1>
            {profile && (
              <div className="mt-1 text-sm text-slate-600">Signed in as {profile.name || profile.email} • {profile.email_verified ? 'Verified' : 'Unverified'}</div>
            )}
          </div>
          <button onClick={() => { localStorage.clear(); window.location.hash = '#/'; }} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50">Sign out</button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Section title="Quick Actions">
            {role === 'business' || role === 'individual' ? (
              <ul className="list-disc pl-5">
                <li>Post a new job</li>
                <li>Add documents for verification</li>
                <li>Fund wallet escrow</li>
              </ul>
            ) : role === 'broker' ? (
              <ul className="list-disc pl-5">
                <li>Browse open jobs</li>
                <li>Submit a proposal</li>
                <li>Upload compliance docs</li>
              </ul>
            ) : (
              <ul className="list-disc pl-5">
                <li>Review new users & verify brokers</li>
                <li>Manage refunds and disputes</li>
                <li>Analytics & system health</li>
              </ul>
            )}
          </Section>
          <Section title="Messages">Chat with brokers and clients in real‑time.</Section>
          <Section title="Wallet & Payments">Secure transactions with escrow support.</Section>
        </div>
      </div>
    </div>
  );
}
