import Link from 'next/link';

async function getDeviceGroup(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/deviceGroups/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch device group');
  }
  return res.json();
}

export default async function DeviceGroupPage({ params }: { params: { id: string } }) {
  const deviceGroup = await getDeviceGroup(params.id);

  return (
    <div>
      <Link href="/device-groups" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Device Groups
      </Link>
      <h1 className="text-2xl font-bold mb-6">{deviceGroup.name}</h1>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
        {JSON.stringify(deviceGroup, null, 2)}
      </pre>
    </div>
  );
}