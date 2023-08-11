import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import App from './components/Dashboard/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Removed <React.StrictMode> </ React.StrictMode> to allow single render at users
  <BrowserRouter>
    <CartProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </CartProvider>
  </BrowserRouter>
);
