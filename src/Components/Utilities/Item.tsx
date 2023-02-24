import * as React from 'react';
import clsx from 'clsx';
import { usePopper } from 'react-popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from 'Store';
import { selectors } from 'Store/Profile';
import { ItemTooltip } from 'Components/Utilities/ItemTooltip';
import { BungieImage } from 'Components/Utilities/BungieImage';

export interface ItemProps {
  hash: number;
}

export const Item: React.FunctionComponent<ItemProps> = ({ hash }) => {
  const item = useAppSelector(state => state.manifest.components?.DestinyInventoryItemDefinition[hash]);
  const isAcquired = useAppSelector(selectors.selectAcquiredItems)[item?.hash ?? -1];

  const [isHovering, setIsHovering] = React.useState(false);
  const [referenceElement, setReferenceElement] = React.useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = React.useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: 'right',
    },
  );

  if (!item) return null;

  const isFaded = !isHovering && !isAcquired;

  return (
    <>
      <div
        className={clsx(
          'relative',
          'h-[44px] w-[44px]',
          isFaded ? 'opacity-40' : '',
        )}
        ref={setReferenceElement}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <BungieImage
          alt={item.displayProperties.name}
          src={item.displayProperties.icon}
        />

        {item.iconWatermark &&
          <div className="absolute top-0 left-0">
            <BungieImage src={item.iconWatermark} />
          </div>
        }

        {isAcquired &&
          <div className="absolute -top-[8px] -right-[8px] pointer-events-none">
            <span className="fa-layers fa-fw">
              <FontAwesomeIcon icon={faCircle} size="sm" />
              <FontAwesomeIcon icon={faCheckCircle} className="text-sky-600" />
            </span>
          </div>
        }
      </div>

      {isHovering &&
        <div
          className="z-10"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <ItemTooltip hash={hash} />
        </div>
      }
    </>
  );
}
