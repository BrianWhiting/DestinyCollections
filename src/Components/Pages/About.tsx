import * as React from 'react';

export const About: React.FunctionComponent = () => {
  return (
    <div className="flex-grow flex flex-col justify-center">
      <div className="w-full my-8 text-sm flex flex-col justify-center text-center">
        <div>
          Destiny Collections is created and maintained by{' '}
          <a
            className="underline"
            href="https://github.com/BrianWhiting"
            target="_blank"
            rel="noopener noreferrer"
          >
            Brian Whiting
          </a>
        </div>
        <div className="mt-2">
          Based on Destiny Sets, created by{' '}
          <a
            className="underline"
            href="https://hachyderm.io/@joshhunt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Josh Hunt
          </a>{' '}
          and{' '}
          <a
            className="underline"
            href="https://twitter.com/Jakosaur"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jakosaur
          </a>
        </div>
        <div className="mt-2">
          Having issues or need help?{' '}
          <a
            className="underline"
            href="https://github.com/BrianWhiting/DestinyCollections/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            File an issue on GitHub
          </a>
        </div>
        <div className="mt-4">
          Destiny is a registered trademark of Bungie<br />
          All images and content are property of Bungie
        </div>
      </div>
    </div>
  );
}