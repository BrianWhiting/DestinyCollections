import * as React from 'react';
import { DestinyInventoryItemDefinition } from 'bungie-api-ts/destiny2';
import { ItemCategoryHashes } from 'Models/Constants';
import { BungieImage } from 'Components/Utilities/BungieImage';

export interface EmblemProps {
  itemDef: DestinyInventoryItemDefinition;
}

export const Emblem: React.FunctionComponent<EmblemProps> = ({ itemDef }) => {
  const isEmblem = itemDef.itemCategoryHashes?.includes(ItemCategoryHashes.emblem) ?? false;
  const showEmblem = isEmblem && !!itemDef.secondaryIcon;

  if (!showEmblem) return null;

  return (
    <>
      <div className="mx-3 my-2 h-[68px]">
        <BungieImage src={itemDef.secondaryIcon} />
      </div>
      <hr className="h-px bg-zinc-500 border-0" />
    </>
  );
}