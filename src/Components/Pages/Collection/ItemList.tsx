import * as React from 'react';
import { Item } from 'Components/Utilities/Item';

export interface ItemListProps {
  data: number[];
}

export const ItemList: React.FunctionComponent<ItemListProps> = ({ data }) => {
  return (
    <div className="flex flex-wrap mr-1">
      {data.map(hash =>
        <div
          key={hash}
          className="m-1"
        >
          <Item hash={hash} />
        </div>
      )}
    </div>
  );
}