import * as React from 'react';
import { GroupData } from 'Models/CollectionData';
import { Set } from './Set';

export interface GroupProps {
  data: GroupData;
}

export const Group: React.FunctionComponent<GroupProps> = ({ data }) => {
  return (
    <div className="flex flex-col">
      <div className="px-3 py-2 bg-zinc-700">
        {data.name}
      </div>
      <div className="grow px-3 pt-3 bg-zinc-800">
        {data.sets.map(set =>
          <Set
            key={`${set.name} ${set.season}`}
            data={set}
          />
        )}
      </div>
    </div>
  );
}
