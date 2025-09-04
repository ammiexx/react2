import React from 'react';
import FloatingSendButton from './FloatingSendButton';
import { PlusCircleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, Link } from 'react-router-dom';
import Profile from '../pages/Profile';
import { useScrollDirection } from './UseScrollDirection'; // ← import the hook

const navigation = [
  { name: 'Categories', href: '/your-discounts' },
  
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
        <div className="relative flex h-12 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo and nav items */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
  <Link to="/" className="flex items-center space-x-2">
    <img
      src="https://videos.openai.com/vg-assets/assets%2Ftask_01k4b6czxyfbe8qgcthwvqfhm5%2F1757017545_img_1.webp?st=2025-09-04T19%3A03%3A48Z&se=2025-09-10T20%3A03%3A48Z&sks=b&skt=2025-09-04T19%3A03%3A48Z&ske=2025-09-10T20%3A03%3A48Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=PVbD2MGvKk2NsTGMPSjh5531H2465mfLvChAPPGVscA%3D&az=oaivgprodscus"
      alt="Kenash Logo"
      className="h-7 w-30 rounded-full object-cover"
      
    />
  </Link>
</div>


            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
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
<div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
   <Link
        to="/nearby-shops"
        className="flex items-center gap-2 px-2 py-1 border border-white text-white rounded-md hover:bg-white hover:text-gray-800 transition duration-200 text-sm"
      >
        Nearby shops
      </Link>
  {/* Add Post */}
      <Link
        to="/form"
        className="flex items-center gap-2 px-2 py-1 border border-white text-white rounded-md hover:bg-white hover:text-gray-800 transition duration-200 text-sm"
        //md=medium,gap-2=8p or 0.5rem,transition is for smooth transition
      >
        <PlusCircleIcon className="h-5 w-5" />
        Add Post
      </Link>
  <Link
        to="/send a message"
        className="flex items-center gap-2 px-1 py-1 border border-white text-white rounded-md hover:bg-white hover:text-gray-800 transition duration-200 text-sm"
      >
        <ChatBubbleLeftRightIcon className="h-5 w-5" />
        What You Want?
      </Link>
  <Profile />
</div>

        </div>
      </div>

      {/* Mobile navigation */}
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
