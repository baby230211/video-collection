import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import AuthRoute from './components/AuthRoute';
import LoginRoute from './components/LoginRoute';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <App />
            </AuthRoute>
          }
        />
        <Route path="/login" element={<LoginRoute />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
