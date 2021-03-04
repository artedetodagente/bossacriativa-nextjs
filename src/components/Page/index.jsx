import React, { useEffect } from 'react';
import Head from 'next/head';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SchoolBar from '@/components/SchoolBar';

export default function Page({ menus, links, children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head>
        <title>Bossa Criativa - Arte de Toda Gente</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <SchoolBar data={links} />
        { menus?.length > 0 && <NavBar menus={menus} /> }
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
