import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CollectionYear5 } from 'Components/Pages/Collection/Instances/CollectionYear5';
import { CollectionYear4 } from 'Components/Pages/Collection/Instances/CollectionYear4';
import { CollectionYear3 } from 'Components/Pages/Collection/Instances/CollectionYear3';
import { CollectionYear2 } from 'Components/Pages/Collection/Instances/CollectionYear2';
import { CollectionYear1 } from 'Components/Pages/Collection/Instances/CollectionYear1';
import { NotFound } from 'Components/Pages/NotFound';
import { About } from 'Components/Pages/About';

export const AppRouter: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<CollectionYear5 />} />
      <Route path="/year-4" element={<CollectionYear4 />} />
      <Route path="/year-3" element={<CollectionYear3 />} />
      <Route path="/year-2" element={<CollectionYear2 />} />
      <Route path="/year-1" element={<CollectionYear1 />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
