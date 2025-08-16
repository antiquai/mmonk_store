'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Image from 'next/image'; 

const links = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-black w-screen shadow top-0 left-0 right-0 z-50 items-center fixed ">
      <div className=" mx-auto max-w-7xl px-10 sm:px-8 lg:px-8  flex items-center justify-center ">
        {/* Logo */}
        <div></div>
        
        <Link href="/" >
          <Image src={"/nn_full_logo.gif"} alt='logo' priority width={160} height={60} />
        </Link>

        {/* Desktop Links
        <nav className="flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium ${
                pathname === link.href
                  ? 'text-black font-bold'
                  : 'text-gray-600 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav> */}
      </div>
    </header>
  );
}
