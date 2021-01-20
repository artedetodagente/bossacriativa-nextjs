import React from 'react';
import '@/styles/globals.css';
import '@/styles/fonts.css';
import { ThemeProvider } from 'styled-components';
import theme from '@/theme';
import core from '@/core';

function MyApp({ Component, pageProps, menus }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} menus={menus} />
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async () => {
  const menus = await core.menus.getAll();
  return {
    menus: menus.nodes || [],
  };
};

export default MyApp;
