import { useEffect, useMemo, useState } from 'react';

const roles = [
  { key: 'business', label: 'Business' },
  { key: 'individual', label: 'Individual' },
  { key: 'broker', label: 'Broker' },
  { key: 'admin', label: 'Admin' },
];

function Input({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <label className="block text-left">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-sky-500/0 transition focus:ring-2"
      />
    </label>
  );
}

export default function AuthForm() {
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('business');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const baseURL = useMemo(() => import.meta.env.VITE_BACKEND_URL || '', []);

  useEffect(() => {
    setMessage('');
  }, [mode]);

  async function request(path, body) {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${baseURL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || data?.message || 'Request failed');
      return data;
    } catch (e) {
      setMessage(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (mode === 'signup') {
        const data = await request('/auth/signup', { name, email, password, role });
        onAuthSuccess(data);
        const verify = await request('/auth/verify/request', { email });
        setMessage(`Verification token (demo): ${verify.token}`);
      } else {
        const data = await request('/auth/login', { email, password });
        onAuthSuccess(data);
      }
    } catch {}
  }

  function onAuthSuccess(data) {
    localStorage.setItem('tp_token', data.access_token);
    localStorage.setItem('tp_role', data.role);
    localStorage.setItem('tp_user', JSON.stringify({ email, name: data.name }));
    // Conditional redirection based on role
    window.location.hash = `#/dashboard/${data.role}`;
    setMessage('');
  }

  async function handlePasswordReset() {
    if (!email) return setMessage('Enter your email first');
    const res = await request('/auth/password/request', { email });
    setMessage(`Reset token (demo): ${res.token || 'generated if account exists'}`);
  }

  async function handlePasswordResetConfirm() {
    const token = prompt('Enter the password reset token');
    const newPass = prompt('Enter a new password');
    if (token && newPass) {
      await request('/auth/password/confirm', { token, new_password: newPass });
      setMessage('Password updated, please login.');
      setMode('login');
    }
  }

  async function handleOAuth(provider) {
    const demoName = name || email.split('@')[0] || 'User';
    const data = await request('/auth/oauth', { provider, email, name: demoName });
    onAuthSuccess(data);
  }

  return (
    <section id="auth" className="w-full bg-slate-50 py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-slate-900">Join the platform</h2>
          <p className="mt-2 text-slate-600">Multi‑role authentication with email verification and social sign‑in.</p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:col-span-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs">
                <button
                  onClick={() => setMode('login')}
                  className={`rounded-md px-3 py-1 font-medium ${mode==='login'?'bg-white shadow':''}`}
                >Login</button>
                <button
                  onClick={() => setMode('signup')}
                  className={`rounded-md px-3 py-1 font-medium ${mode==='signup'?'bg-white shadow':''}`}
                >Sign up</button>
              </div>
              {mode === 'signup' && (
                <div className="flex items-center gap-1 text-xs text-slate-600">
                  Role:
                  <select value={role} onChange={(e)=>setRole(e.target.value)} className="rounded-md border border-slate-200 bg-white px-2 py-1">
                    {roles.map(r => <option key={r.key} value={r.key}>{r.label}</option>)}
                  </select>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              {mode === 'signup' && (
                <Input label="Full name" value={name} onChange={setName} placeholder="Jane Doe" />
              )}
              <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="you@company.com" />
              <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-700 disabled:opacity-50"
              >
                {loading ? 'Please wait…' : (mode === 'signup' ? 'Create account' : 'Login')}
              </button>

              {mode === 'login' && (
                <div className="mt-3 flex items-center justify-between text-xs">
                  <button type="button" onClick={handlePasswordReset} className="text-sky-700 hover:underline">Forgot password?</button>
                  <button type="button" onClick={handlePasswordResetConfirm} className="text-slate-600 hover:underline">Have token?</button>
                </div>
              )}

              {message && (
                <div className="mt-3 rounded-md bg-amber-50 p-3 text-xs text-amber-800 ring-1 ring-amber-200">{message}</div>
              )}
            </form>

            <div className="mt-4">
              <div className="text-center text-xs text-slate-500">or continue with</div>
              <div className="mt-2 flex items-center justify-center gap-3">
                <button onClick={() => handleOAuth('google')} className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50">
                  <svg className="h-4 w-4" viewBox="0 0 533.5 544.3" aria-hidden><path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.2H272v95h146.9c-6.3 34-25 62.9-53.3 82v67h86.1c50.3-46.3 81.8-114.6 81.8-193.8z"/><path fill="#34A853" d="M272 544.3c72.9 0 134.1-24.1 178.8-65.1l-86.1-67c-23.9 16-54.6 25.6-92.7 25.6-71.2 0-131.6-48-153.2-112.5h-89.6v70.7C73.2 486.8 165.4 544.3 272 544.3z"/><path fill="#FBBC04" d="M118.8 325.3c-10.9-32.9-10.9-68.2 0-101.1v-70.7H29.2C10.5 198.9 0 234.9 0 272s10.5 73.1 29.2 118.5l89.6-65.2z"/><path fill="#EA4335" d="M272 107.7c39.6-.6 77.5 14.4 106.3 41.5l79.4-79.4C405.9 24.2 345.2 0 272 0 165.4 0 73.2 57.5 29.2 153.5l89.6 70.7C140.4 155.8 200.8 107.7 272 107.7z"/></svg>
                  Google
                </button>
                <button onClick={() => handleOAuth('linkedin')} className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.86-3.04-1.87 0-2.15 1.46-2.15 2.95v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.34 2.41 4.34 5.53v6.21zM5.34 7.43c-1.15 0-2.09-.94-2.09-2.09 0-1.15.94-2.09 2.09-2.09 1.15 0 2.09.94 2.09 2.09 0 1.15-.94 2.09-2.09 2.09zM7.11 20.45H3.56V9h3.55v11.45z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                  LinkedIn
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-600 to-indigo-600 p-6 text-white md:col-span-2">
            <h3 className="text-lg font-semibold">Why join {`TradePortal`}?</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-sky-50/90">
              <li>Role‑based dashboards for Businesses, Individuals, Brokers, and Admins</li>
              <li>Secure escrow payments and verified broker network</li>
              <li>Document center with status tracking and audit logs</li>
              <li>Email verification and social sign‑in support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
