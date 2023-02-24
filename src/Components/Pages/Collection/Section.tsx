import * as React from 'react';
import { SectionData } from 'Models/CollectionData';
import { Group } from 'Components/Pages/Collection/Group';

export interface SectionProps {
  data: SectionData;
}

export const Section: React.FunctionComponent<SectionProps> = ({ data }) => {
  return (
    <div className="mb-6">
      <div className="text-xl mb-1">
        {data.name}
      </div>
      <div id={data.name}>
        <div className="pt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {data.groups.map(group =>
            <Group
              key={group.name}
              data={group}
            />
          )}
        </div>
      </div>
    </div>
  );
}
