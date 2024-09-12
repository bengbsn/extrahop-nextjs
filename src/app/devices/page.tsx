import Link from 'next/link';

async function getDevices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/devices`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch device groups');
  }
  return res.json();
}

export default async function DevicesPage() {
  const devices = await getDevices();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Devices</h1>
      <ul className="space-y-2">
        {devices.map((device: { id: string; default_name: string }) => (
          <li key={device.id}>
            <Link 
              href={`/devices/${device.id}`}
              className="text-blue-500 hover:underline"
            >
              {device.default_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}