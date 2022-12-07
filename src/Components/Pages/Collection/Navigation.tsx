import * as React from 'react';
import { Link } from 'react-scroll';
import { SectionData } from 'Models/CollectionData';

export interface NavigationProps {
  sections: SectionData[];
}

export const Navigation: React.FunctionComponent<NavigationProps> = ({ sections }) => {
  return (
    <div className="h-2">
      <div className="fixed h-10 min-w-full bg-zinc-900 shadow-lg flex items-center z-10">
        {sections.map(section =>
          <Link
            key={section.name}
            spy
            smooth
            to={section.name}
            offset={-88}
            duration={350}
            className="h-full px-2 text-sm cursor-pointer flex items-center hover:bg-zinc-700 transition-all border-2 border-transparent"
            activeClass="border-b-zinc-400"
          >
            {section.name}
          </Link>
        )}
      </div>
    </div>
  );
}