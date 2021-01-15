import React from 'react';
import '@/styles/globals.css';
import '@/styles/fonts.css';
import { ThemeProvider } from 'styled-components';
import theme from '@/theme';
import core from '@/core';
import Head from 'next/head';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SchoolBar from '@/components/SchoolBar';

function MyApp({ Component, pageProps, menus }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Bossa Criativa - Arte de Toda Gente</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <SchoolBar />
        <NavBar menus={menus} />
      </header>
      <Component {...pageProps} />
      <Footer />
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
