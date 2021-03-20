import Breadcrumb from '@/components/Breadcrumb';
import Fluid from '@/components/Fluid';
import Masonry from '@/components/Masonry';
import Page from '@/components/Page';
import Section from '@/components/Section';
import Title from '@/components/Title';
import core from '@/core';
import React from 'react';

export default function Gallery({ menus, links }) {
  return (
    <Page menus={menus} links={links}>
      <Breadcrumb />
      <Fluid>
        <Section>
          <header>
            <Title>Galeria</Title>
          </header>
          <main>
            <Masonry
              source={[]}
            />
          </main>
        </Section>
      </Fluid>
    </Page>
  );
}

export async function getStaticProps() {
  const menus = await core.menus.getAll();
  const links = await core.links.getAll();

  return {
    props: {
      menus: menus.nodes || [],
      links: links.nodes || [],
    },
    revalidate: 1,
  };
}
