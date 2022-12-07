import * as React from 'react';
import { HiddenWhenAuthorized } from 'Components/Utilities/HiddenWhenAuthorized';
import { LoginLink } from 'Components/Utilities/LoginLink';

export const LoginBanner: React.FunctionComponent = () => {
  return (
    <HiddenWhenAuthorized>
      <div className="sticky bottom-0 bg-zinc-700 h-28 flex flex-col justify-center items-center">
        <div className="mb-5">
          Connect your Bungie.net account to automatically track items you&apos;ve acquired.
        </div>
        <div>
          <LoginLink
            className="bg-amber-400 text-zinc-900 px-5 py-2"
            text="Connect Bungie.net"
          />
        </div>
      </div>
    </HiddenWhenAuthorized>
  );
}