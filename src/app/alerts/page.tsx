// src/app/alerts/page.tsx

import Link from 'next/link';

async function getAlerts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/alerts`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch alerts');
  }
  return res.json();
}

export default async function AlertsPage() {
  const alerts = await getAlerts();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Alerts</h1>
      <ul className="space-y-2">
        {alerts.map((alert: { id: string; name: string }) => (
          <li key={alert.id}>
            <Link 
              href={`/alerts/${alert.id}`}
              className="text-blue-500 hover:underline"
            >
              {alert.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}