window.global=window;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import './styles/global.css';
import './styles/dashboard.css';

import ErrorBoundary from './components/ErrorBoundary.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'rgba(26,26,46,0.95)',
                color: '#fff',
                border: '1px solid rgba(255,107,53,0.3)',
                borderRadius: '12px',
                backdropFilter: 'blur(12px)',
                fontSize: '0.9rem',
              },
              success: {
                iconTheme: { primary: '#06D6A0', secondary: '#fff' },
              },
              error: {
                iconTheme: { primary: '#EF476F', secondary: '#fff' },
              },
            }}
          />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
