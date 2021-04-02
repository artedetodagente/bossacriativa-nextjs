import React from 'react';
// import '@/styles/nv_sc-bars.css';
import '@/styles/globals.css';
import '@/styles/fonts.css';
import { ThemeProvider } from 'styled-components';
import theme from '@/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
