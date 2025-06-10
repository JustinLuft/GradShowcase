import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { addEventHandlers } from './processing.tsx'

// addEventHandlers();

createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
);
