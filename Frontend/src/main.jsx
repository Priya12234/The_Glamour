import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/Client_side/Assets/css/global.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)

//added comment 