import Link from 'next/link';

async function getDevice(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/devices/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch device');
  }
  return res.json();
}

export default async function DevicePage({ params }: { params: { id: string } }) {
  const device = await getDevice(params.id);

  return (
    <div>
      <Link href="/devices" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Devices
      </Link>
      <h1 className="text-2xl font-bold mb-6">{device.display_name}</h1>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
        {JSON.stringify(device, null, 2)}
      </pre>
    </div>
  );
}