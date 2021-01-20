import React from 'react';
import Info from '@/components/Info';
import FlatList from '@/components/FlatList';
import Breadcrumb from '@/components/Breadcrumb';
import { useRouter } from 'next/router';
import Fluid from '@/components/Fluid';
import core from '@/core';
import CardThumb from '@/components/CardThumb';
import Page from '@/components/Page';

export default function Lives({ lives, menus }) {
  const { push } = useRouter();

  return (
    <Page menus={menus}>
      <Breadcrumb />
      <Info
        title="Lives"
        text=""
      />
      <Fluid>
        <FlatList
          source={lives}
          colsxss={1}
          colsmd={2}
          cols={3}
          colsl={4}
          colsxl={6}
          renderItem={(item) => (
            <CardThumb
              video={item.acf_data?.videoUrl}
              title={item.title}
              excerpt={item.excerpt}
              click={() => push(`lives/${item.slug}`)}
            />
          )}
        />
      </Fluid>
    </Page>
  );
}

export async function getStaticProps() {
  const lives = await core.lives.getAll();
  return {
    props: {
      lives: lives.nodes || [],
    },
    revalidate: process.env.REQUEST_TIME,
  };
}
