import React from 'react';
import './index.css';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { lightMode } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './components/auth/AuthProvider';
var ReactDOM = require('react-dom/client');

const rootNode = document.getElementById('root')!;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <ThemeProvider theme={lightMode}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
