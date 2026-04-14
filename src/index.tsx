import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";

import Index from './components/index';
import Framerate from './components/framerate';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
          <Route path="/" element={<Index />} />
          <Route path="framerate" element={<Framerate />} />
          <Route path="*" element={<Index />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
