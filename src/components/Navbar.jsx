import React from 'react';
import Searching from './Searching';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, Link } from 'react-router-dom';
import { useScrollDirection } from './UseScrollDirection';
import knash from '../assets/newlogo.png'; // adjust path

const navigation = [
  { name: 'Order Now', href: '/forsale' },
  { name: 'Shops', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Nearby Shops', href: '/nearby-shops' },
  { name: 'Add Post', href: '/form' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navigation({ products, onFilter }) {
  const scrollDirection = useScrollDirection();

  return (
    <Disclosure
      as="nav"
      className={classNames(
        'sticky top-0 z-50 transition-transform duration-300 bg-gray-800',
        scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between gap-2">

          {/* LEFT: Hamburger + Logo */}
          <div className="flex items-center gap-2">
            <div className="sm:hidden">
              <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>

            <Link to="/" className="flex items-center">
              <img
                src={knash}
                alt="Kenash Logo"
                className="h-12 w-11 rounded-full object-cover"
              />
            </Link>
          </div>

          {/* CENTER: Search bar always visible */}
          <div className="flex-1 px-2">
            <Searching products={products} onFilter={onFilter} />
          </div>

          {/* RIGHT: Links (only on larger screens) */}
          <div className="hidden sm:flex items-center gap-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  classNames(
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium'
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={NavLink}
              to={item.href}
              className={({ isActive }) =>
                classNames(
                  isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )
              }
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
