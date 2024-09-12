// src/components/Navigation.tsx

import Link from 'next/link';
import { links } from '@/data/navigation';

export default function Navigation() {
  return (
    <nav className="bg-gray-800 w-64 min-h-screen fixed left-0 top-0">
      <div className="p-4">
        {/* Website Logo or Title */}
        <Link href="/" className="text-white font-bold text-xl block mb-6 p-3">
          extrahop-nextjs
        </Link>
        {/* Navigation Links */}
        <div className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}