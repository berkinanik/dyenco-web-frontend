import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';

import { App } from './App.tsx';

import './index.css';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider resetCSS={false} theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
