import Link from 'next/link';

async function getAlert(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/alerts/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch alert');
  }
  return res.json();
}

export default async function AlertPage({ params }: { params: { id: string } }) {
  const alert = await getAlert(params.id);

  return (
    <div>
      <Link href="/alerts" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Alerts
      </Link>
      <h1 className="text-2xl font-bold mb-6">{alert.name}</h1>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
        {JSON.stringify(alert, null, 2)}
      </pre>
    </div>
  );
}