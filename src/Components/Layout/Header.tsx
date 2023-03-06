import clsx from 'clsx';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from 'Store';
import { actions } from 'Store/Authorization';
import { HiddenWhenAuthorized } from 'Components/Utilities/HiddenWhenAuthorized';
import { LoginLink } from 'Components/Utilities/LoginLink';
import { Logo } from 'Images/Logo';
import { HiddenWhenUnauthorized } from 'Components/Utilities/HiddenWhenUnauthorized';

const links = [
  { name: 'Year 6', to: '/' },
  { name: 'Year 5', to: '/year-5' },
  { name: 'Year 4', to: '/year-4' },
  { name: 'Year 3', to: '/year-3' },
  { name: 'Year 2', to: '/year-2' },
  { name: 'Year 1', to: '/year-1' },
  { name: 'About', to: 'about' },
]

export const Header: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="h-12 z-10">
      <div className="fixed h-12 min-w-full bg-zinc-800 shadow-lg flex flex-col justify-center">
        <div className="h-full w-full px-3 flex items-center">
          <Logo className="w-6 mr-1" />
          <div className="mx-2 text-xl">
            Destiny Collections
          </div>
          {links.map(link =>
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                clsx(
                  'h-full px-2 text-sm flex items-center hover:bg-zinc-700 transition-all border-2 border-transparent',
                  isActive && 'border-b-zinc-400',
                )
              }
            >
              {link.name}
            </NavLink>
          )}
          <div className="flex-grow flex justify-end text-sm">
            <HiddenWhenAuthorized>
              <div>
                <LoginLink
                  className="bg-amber-400 text-zinc-900 px-3 py-2"
                  text="Connect Bungie.net"
                />
              </div>
            </HiddenWhenAuthorized>
            <HiddenWhenUnauthorized>
              <div>
                <button onClick={() => dispatch(actions.logout())}>
                  Logout
                </button>
              </div>
            </HiddenWhenUnauthorized>
          </div>
        </div>
      </div>
    </div>
  );
}