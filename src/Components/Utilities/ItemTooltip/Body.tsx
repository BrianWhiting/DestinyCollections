import { DestinyInventoryItemDefinition } from 'bungie-api-ts/destiny2';
import * as React from 'react';
import { useAppSelector } from 'Store';

export interface BodyProps {
  itemDef: DestinyInventoryItemDefinition;
}

export const Body: React.FunctionComponent<BodyProps> = ({ itemDef }) => {
  const collectibleDef = useAppSelector(state => state.manifest.components?.DestinyCollectibleDefinition[itemDef.collectibleHash ?? -1]);

  return (
    <div className="text-sm flex flex-col gap-2 py-2 px-3">
      {itemDef.flavorText &&
        <>
          <div className="">
            <em>{itemDef.flavorText}</em>
          </div>
          <hr className="-mx-3 h-px bg-zinc-500 border-0" />
        </>
      }
      {itemDef.displayProperties.description &&
        <>
          <div className="">
            {itemDef.displayProperties.description}
          </div>
          <hr className="-mx-3 h-px bg-zinc-500 border-0" />
        </>
      }
      {collectibleDef?.sourceString
        ? <div className="">
            {collectibleDef.sourceString}
          </div>
        : <div className="">
            Source: Unknown
          </div>
      }
    </div>
  );
}