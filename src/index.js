import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import App from './components/Dashboard/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Removed <React.StrictMode> </ React.StrictMode> to allow single render at users
  <BrowserRouter>
  <UserProvider>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </UserProvider>
</BrowserRouter>
);
