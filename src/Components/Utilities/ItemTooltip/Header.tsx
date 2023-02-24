import * as React from 'react';
import clsx from 'clsx';
import { useAppSelector } from 'Store';
import { BucketTypeHashes, ClassType, ClassTypeHashes, ItemTierTypeHashes } from 'Models/Constants';
import { BungieImage } from 'Components/Utilities/BungieImage';
import { DestinyAmmunitionType, DestinyInventoryItemDefinition } from 'bungie-api-ts/destiny2';
import { Primary } from 'Images/AmmoIcons/Primary';
import { Heavy } from 'Images/AmmoIcons/Heavy';
import { Special } from 'Images/AmmoIcons/Special';

export interface HeaderProps {
  itemDef: DestinyInventoryItemDefinition;
}

const tierClassName = {
  [ItemTierTypeHashes.basic]: 'bg-item-basic',
  [ItemTierTypeHashes.uncommon]: 'bg-item-uncommon',
  [ItemTierTypeHashes.rare]: 'bg-item-rare',
  [ItemTierTypeHashes.legendary]: 'bg-item-legendary',
  [ItemTierTypeHashes.exotic]: 'bg-item-exotic',
}

export const Header: React.FunctionComponent<HeaderProps> = ({ itemDef }) => {
  const classDef = useAppSelector(state => state.manifest.components?.DestinyClassDefinition[ClassTypeHashes[itemDef?.classType ?? -1] ?? -1]);
  const damageTypeDef = useAppSelector(state => state.manifest.components?.DestinyDamageTypeDefinition[itemDef?.defaultDamageTypeHash ?? -1]);
  const breakerTypeDef = useAppSelector(state => state.manifest.components?.DestinyBreakerTypeDefinition[itemDef?.breakerTypeHash ?? -1]);

  const tierTypeHash = itemDef?.inventory?.tierTypeHash ?? -1;

  const ammoTypeComponent =
    itemDef.equippingBlock?.ammoType === DestinyAmmunitionType.Primary ? <Primary className="h-4" /> :
    itemDef.equippingBlock?.ammoType === DestinyAmmunitionType.Special ? <Special className="h-4" /> :
    itemDef.equippingBlock?.ammoType === DestinyAmmunitionType.Heavy ? <Heavy className="h-4" /> :
    undefined;

  return (
    <div className={clsx('flex flex-col py-1 px-3', tierClassName[tierTypeHash])}>
      <div className="text-lg font-bold uppercase">
        {itemDef.displayProperties.name}
      </div>
      <div className="flex justify-between text-sm opacity-70 mb-1">
        <div className="flex items-center">
          <div className="mr-1">
            {itemDef.redacted
              ? <em>Classified Item</em>
              : <>
                  {itemDef.classType !== ClassType.unknown &&
                    itemDef.inventory?.bucketTypeHash !== BucketTypeHashes.classArmor &&
                    itemDef.inventory?.bucketTypeHash !== BucketTypeHashes.mod
                    ? <>{classDef?.displayProperties.name} </>
                    : ''
                  }
                  {itemDef.itemTypeDisplayName}
                </>
            }
          </div>
          {ammoTypeComponent !== undefined &&
            <div className="ml-1">
              {ammoTypeComponent}
            </div>
          }
          {damageTypeDef?.displayProperties.icon &&
            <div className="ml-1 w-[16px] h-[16px]">
              <BungieImage
                alt={damageTypeDef.displayProperties.name}
                src={damageTypeDef.displayProperties.icon}
              />
            </div>
          }
          {breakerTypeDef?.displayProperties.icon &&
            <div className="ml-1 w-[16px] h-[16px]">
              <BungieImage
                alt={breakerTypeDef.displayProperties.name}
                src={breakerTypeDef.displayProperties.icon}
              />
            </div>
          }
        </div>
        <div>
          {itemDef.inventory?.tierTypeName}
        </div>
      </div>
    </div>
  )
}