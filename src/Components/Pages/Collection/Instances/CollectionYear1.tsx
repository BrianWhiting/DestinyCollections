import * as React from 'react';
import { Collection } from 'Components/Pages/Collection';

import { collectionDataYear1 } from 'Data/CollectionDataYear1';

export const CollectionYear1: React.FunctionComponent = () => {
  return (
    <>
      <Collection data={collectionDataYear1} />
    </>
  )
}