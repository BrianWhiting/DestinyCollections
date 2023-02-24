import * as React from 'react';
import { Collection } from 'Components/Pages/Collection';

import { collectionDataYear2 } from 'Data/CollectionDataYear2';

export const CollectionYear2: React.FunctionComponent = () => {
  return (
    <>
      <Collection data={collectionDataYear2} />
    </>
  )
}