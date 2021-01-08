import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import NavBar from '../Navbar';

export default function Page({ children, enableMenu }) {
  return (
    <>
      <Head>
        <title>Bossa Criativa - Arte de Toda Gente</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        { enableMenu && <NavBar /> }
      </header>
      <main>{children}</main>
      <footer />
    </>
  );
}

Page.propTypes = {
  enableMenu: PropTypes.bool,
};

Page.defaultProps = {
  enableMenu: true,
};
