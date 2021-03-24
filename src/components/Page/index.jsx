import React, { useEffect } from 'react';
import Head from 'next/head';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SchoolBar from '@/components/SchoolBar';
import FooterMenu from '../FooterMenu';

export default function Page({
  menus, menusRodape, links, cssLink, children,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head>
        <title>Bossa Criativa - Arte de Toda Gente</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="/css/ft-menu.css" rel="stylesheet" />
        { (cssLink) ? <link href={`/css/${cssLink}`} rel="stylesheet" /> : '' }
      </Head>
      <header>
        <SchoolBar data={links} />
        { menus?.length > 0 && <NavBar menus={menus} /> }
      </header>
      <main>{children}</main>
      { menusRodape?.length > 0 && <FooterMenu menus={menusRodape} /> }
      <Footer />
    </>
  );
}
