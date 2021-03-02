import Breadcrumb from '@/components/Breadcrumb';
import CardFigure from '@/components/CardFigure';
import FlatList from '@/components/FlatList';
import Fluid from '@/components/Fluid';
import Page from '@/components/Page';
import Section from '@/components/Section';
import core from '@/core';
import { useRouter } from 'next/router';
import React from 'react';

export default function Notices({ notices, menus, links }) {
  const { push } = useRouter();

  return (
    <Page menus={menus} links={links}>
      <Breadcrumb />
      <Fluid>
        <Section title="Notícias">
          <FlatList
            source={notices}
            cols={3}
            renderItem={(item) => (
              <CardFigure
                title={item.title}
                excerpt={item.acf_chamada_post?.chamadaHome}
                image={item.featuredImage?.node?.mediaItemUrl}
                click={() => push(`noticias/${item.slug}`)}
              />
            )}
          />
        </Section>
      </Fluid>
    </Page>
  );
}

export async function getServerSideProps({ query }) {
  const menus = await core.menus.getAll();
  const links = await core.links.getAll();
  const notices = await core.posts.getAll();

  return {
    props: {
      menus: menus.nodes || [],
      links: links.nodes || [],
      notices: notices.nodes || [],
    },
    revalidate: 1,
  };
}
