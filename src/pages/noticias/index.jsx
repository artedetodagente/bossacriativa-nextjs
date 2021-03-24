import Breadcrumb from '@/components/Breadcrumb';
import CardImageWithText from '@/components/CardImageWithText';
import FlatList from '@/components/FlatList';
import Fluid from '@/components/Fluid';
import Page from '@/components/Page';
import Section from '@/components/Section';
import Title from '@/components/Title';
import core from '@/core';
import { useRouter } from 'next/router';
import React from 'react';

export default function Notices({
  notices, menus, links, menusRodape,
}) {
  const { push } = useRouter();

  return (
    <Page menus={menus} links={links} menusRodape={menusRodape}>
      <Breadcrumb />
      <Fluid>
        <Section>
          <header>
            <Title>Notícias</Title>
          </header>
          <main>
            <FlatList
              source={notices}
              cols={3}
              renderItem={(item) => (
                <CardImageWithText
                  title={item.title}
                  excerpt={item.acf_chamada_post?.chamadaHome}
                  image={item.featuredImage?.node?.mediaItemUrl}
                  click={() => push(`noticias/${item.slug}`)}
                />
              )}
            />
          </main>
        </Section>
      </Fluid>
    </Page>
  );
}

export async function getServerSideProps({ query }) {
  const menus = await core.menus.getAll();
  const menusRodape = await core.menus.getAll('menu_rodape');
  const links = await core.links.getAll();
  const notices = await core.posts.getAll(null, query?.search);

  return {
    props: {
      menus: menus.nodes || [],
      menusRodape: menusRodape?.nodes || [],
      links: links.nodes || [],
      notices: notices.nodes || [],
    },
  };
}
