export async function getDeviceGroups() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/deviceGroups`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch device groups');
  }
  return res.json();
}