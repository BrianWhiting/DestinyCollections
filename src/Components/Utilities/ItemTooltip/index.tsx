import * as React from 'react';
import { useAppSelector } from 'Store';
import { Header } from 'Components/Utilities/ItemTooltip/Header';
import { Emblem } from 'Components/Utilities/ItemTooltip/Emblem';
import { Body } from 'Components/Utilities/ItemTooltip/Body';

export interface ItemTooltipProps {
  hash: number;
}

export const ItemTooltip: React.FunctionComponent<ItemTooltipProps> = ({ hash }) => {
  const itemDef = useAppSelector(state => state.manifest.components?.DestinyInventoryItemDefinition[hash]);

  if (!itemDef) return null;

  return (
    <div className="bg-zinc-700 w-[360px] mx-1">
      <Header itemDef={itemDef} />
      <Emblem itemDef={itemDef} />
      <Body itemDef={itemDef} />
    </div>
  );
}