import React from 'react';
import FloatingSendButton from './FloatingSendButton';
import { PlusCircleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, Link } from 'react-router-dom';
import Profile from '../pages/Profile';
import { useScrollDirection } from './UseScrollDirection'; // ← import the hook
import knash from '../assets/newlogo.png'; // adjust the path if needed



const navigation = [
  { name: 'Order Now', href: '/forsale' },
  { name: 'Nearby shops', href: '/nearby-shops' },
  { name: 'Items For Sale', href: '/' },
  { name: 'Services', href: '/services' },

];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function Navigation() {
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
        <div className="flex h-12 items-center justify-between">
          
          {/* LEFT: Hamburger (mobile) + Logo */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <div className="sm:hidden mr-2">
              <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img
  src={knash}
  alt="Kenash Logo"
  className="h-12 w-30 rounded-full object-cover"
/>

            </Link>
          </div>

          {/* CENTER: Navigation (desktop only) */}
          <div className="hidden sm:flex sm:space-x-4">
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

          {/* RIGHT: Profile + Actions */}
          <div className="flex items-center gap-2">
           

            <Link
              to="/form"
              className="flex items-center gap-2 px-2 py-1 border border-white text-white rounded-md hover:bg-white hover:text-gray-800 transition duration-200 text-sm"
            >
              <PlusCircleIcon className="h-5 w-5" />
              Add Post
            </Link>
             <Link
              to="/chat"
              className="flex items-center gap-2 px-2 py-1 border border-white text-white rounded-md hover:bg-white hover:text-gray-800 transition duration-200 text-sm"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              Chat
            </Link>


            {/* <Profile /> */}
          </div>
        </div>
      </div>

      {/* Mobile navigation dropdown */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={NavLink}
              to={item.href}
              className={({ isActive }) =>
                classNames(
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white',
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
