import * as React from 'react';
import { CollectionData } from 'Models/CollectionData';
import { Section } from 'Components/Pages/Collection/Section';
import { Navigation } from 'Components/Pages/Collection/Navigation';

export interface CollectionProps {
  data: CollectionData;
}

export const Collection: React.FunctionComponent<CollectionProps> = ({ data }) => {
  return (
    <div className="mb-4">
      <Navigation sections={data.sections} />
      <div className="mx-4">
        {data.sections.map(section =>
          <Section
            key={section.name}
            data={section}
          />
        )}
      </div>
    </div>
  );
};