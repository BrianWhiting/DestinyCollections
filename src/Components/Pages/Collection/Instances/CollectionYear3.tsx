import * as React from 'react';
import { Collection } from 'Components/Pages/Collection';

import { collectionDataYear3 } from 'Data/CollectionDataYear3';

export const CollectionYear3: React.FunctionComponent = () => {
  return (
    <>
      <Collection data={collectionDataYear3} />
    </>
  )
}