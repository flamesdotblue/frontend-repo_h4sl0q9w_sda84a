import { useEffect, useState } from 'react';
import Dashboard from './Dashboard';

export default function MiniRouter({ landing }) {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const onChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  if (route.startsWith('#/dashboard/')) {
    const role = route.split('/')[2] || 'business';
    return <Dashboard role={role} />;
  }

  return landing;
}
