import React from 'react';
import './index.css';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { lightMode } from './theme';
import GlobalStyle from './GlobalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';
var ReactDOM = require('react-dom/client');

const rootNode = document.getElementById('root')!;
const queryClient = new QueryClient();

ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <ThemeProvider theme={lightMode}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
