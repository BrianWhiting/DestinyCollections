import * as React from 'react';
import { Collection } from 'Components/Pages/Collection';

import { collectionDataYear4 } from 'Data/CollectionDataYear4';

export const CollectionYear4: React.FunctionComponent = () => {
  return (
    <>
      <Collection data={collectionDataYear4} />
    </>
  )
}