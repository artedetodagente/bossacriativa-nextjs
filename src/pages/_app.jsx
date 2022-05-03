import React from 'react';
import '@/styles/globals.css';
import '@/styles/fonts.css';
import { ThemeProvider } from 'styled-components';
import theme from '@/theme';

// Inicio da aplicação
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
