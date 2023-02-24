import * as React from 'react';
import { Collection } from 'Components/Pages/Collection';

import { collectionDataYear5 } from 'Data/CollectionDataYear5';

export const CollectionYear5: React.FunctionComponent = () => {
  return (
    <>
      <Collection data={collectionDataYear5} />
    </>
  )
}