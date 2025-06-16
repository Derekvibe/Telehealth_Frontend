import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { Provider } from 'react-redux';
import store from '../store/store.js'; // adjust if path is different
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { StreamProvider } from './components/StreamContext.jsx';


const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <StreamProvider>
          <App />
      </StreamProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
