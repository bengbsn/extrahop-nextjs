import Link from 'next/link';

async function getDeviceGroups() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/deviceGroups`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch device groups');
  }
  return res.json();
}

export default async function DeviceGroupsPage() {
  const deviceGroups = await getDeviceGroups();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Device Groups</h1>
      <ul className="space-y-2">
        {deviceGroups.map((deviceGroup: { id: string; name: string }) => (
          <li key={deviceGroup.id}>
            <Link 
              href={`/device-groups/${deviceGroup.id}`}
              className="text-blue-500 hover:underline"
            >
              {deviceGroup.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}