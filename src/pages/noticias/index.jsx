import Breadcrumb from '@/components/Breadcrumb';
import News from '@/components/News';
import Fluid from '@/components/Fluid';
import Page from '@/components/Page';
import Section from '@/components/Section';
import Title from '@/components/Title';
import core from '@/core';
import styles from '@/styles/noticias.module.css';
import React, { useEffect, useState } from 'react';

export default function Noticias({
  menus, links, menusRodape,
}) {
  const [pages, setPages] = useState([]);

  const proximaPagina = (cursor) => {
    // eslint-disable-next-line no-shadow
    setPages((pages) => [...pages, <News after={cursor} action={proximaPagina} />]);
  };

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    setPages((pages) => [...pages, <News action={proximaPagina} />]);
  }, []);

  return (
    <Page menus={menus} links={links} menusRodape={menusRodape}>
      <Breadcrumb />
      <Fluid>
        <Section>
          <header>
            <Title>Notícias</Title>
          </header>
          <main>
            <div id={styles.listaNoticias}>
              {pages.map((item, index) => (
                <div key={index}>
                  {item}
                </div>
              ))}
            </div>
          </main>
        </Section>
      </Fluid>
    </Page>
  );
}

export async function getServerSideProps() {
  const menus = await core.menus.getAll();
  const menusRodape = await core.menus.getAll('menu_rodape');
  const links = await core.links.getAll();

  return {
    props: {
      menus: menus.nodes || [],
      menusRodape: menusRodape?.nodes || [],
      links: links.nodes || [],
    },
  };
}
