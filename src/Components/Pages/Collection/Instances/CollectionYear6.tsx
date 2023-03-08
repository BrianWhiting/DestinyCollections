import * as React from 'react';
import { Collection } from 'Components/Pages/Collection';

import { collectionDataYear6 } from 'Data/CollectionDataYear6';

export const CollectionYear6: React.FunctionComponent = () => {
  return (
    <>
      <Collection data={collectionDataYear6} />
    </>
  )
}