import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/app';

function getContainer(elementId: string): HTMLElement {
  const container = document.getElementById(elementId);

  if (!container) {
    throw Error(`Missing container element ${elementId}`);
  }

  return container;
}

createRoot(getContainer('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
