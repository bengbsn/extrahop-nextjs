import Navigation from './Navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Navigation />
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}