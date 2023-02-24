import * as React from 'react';
import { SetData } from 'Models/CollectionData';
import { ItemList } from 'Components/Pages/Collection/ItemList';

export interface SetProps {
  data: SetData;
}

export const Set: React.FunctionComponent<SetProps> = ({ data }) => {
  const groupedItems = React.useMemo(() => {
    const result: number[][] = [[]];
    data.items.forEach(value => {
      Array.isArray(value)
        ? result.push(value as number[])
        : result[0].push(value);
    });
    if (result[0].length === 0) {
      result.splice(0, 1);
    }
    return result;
  }, [data.items]);

  return (
    <div className="mb-3">
      <div className="mb-1 flex items-center">
        <div>
          {data.name}
        </div>
        {data.season !== undefined &&
          <div className="ml-2 px-1 py-0.5 text-xs bg-zinc-700">
            S{data.season}
          </div>
        }
      </div>
      <div className="flex flex-wrap -m-1">
        {groupedItems.map((items, index) =>
          <React.Fragment key={index}>
            {items.length > 0
              ? <ItemList
                  key={index}
                  data={items}
                />
              : <hr className="basis-full h-0 border-0" />
            }
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
