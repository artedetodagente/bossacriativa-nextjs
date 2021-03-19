/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import Section from '@/components/Section';
import Breadcrumb from '@/components/Breadcrumb';
import core from '@/core';
import Fluid from '@/components/Fluid';
import YouEmbed from '@/components/YouEmbed';
import FlatList from '@/components/FlatList';
import CardThumb from '@/components/CardThumb';
import Page from '@/components/Page';
import styles from '@/styles/lives-quadro-slug.module.css';
import { getISODateString } from '@/utils/date';
import Title from '@/components/Title';

export default function QuadroSlug({ quadro, menus, links }) {
  const [video, setVideo] = useState(0);

  async function changeVideo(id) {
    const index = quadro?.lives.nodes.findIndex((item) => item.id === id);
    const dist = document.querySelector('.cabecalho').scrollHeight;
    document.body.scrollTop = dist;
    document.documentElement.scrollTop = dist;
    setVideo(index);
  }

  return (
    <Page menus={menus} links={links}>
      <div className="cabecalho">
        <Breadcrumb />
      </div>
      <Fluid className={styles.layout}>
        <div className={styles.player}>
          <YouEmbed
            url={quadro?.lives.nodes[video]?.acf_data.videoUrl}
          />
        </div>
        <Section className={styles.listContainer}>
          <header>
            <Title>Próximos Vídeos</Title>
          </header>
          <main>
            <FlatList
              className={styles.list}
              source={quadro?.lives.nodes.slice(video + 1, video + 3) || []}
              colsxss={2}
              cols={1}
              renderItem={(item) => (
                <CardThumb
                  video={item.acf_data?.videoUrl}
                  image={item.featuredImage?.node.mediaItemUrl
                    || item.acf_data.imagemDestacada?.mediaItemUrl}
                  title={item.title}
                  excerpt={item.excerpt}
                  click={() => changeVideo(item.id)}
                />
              )}
            />
          </main>
        </Section>
        <Section className={styles.videosContainer}>
          <header>
            <Title>Todos os vídeos</Title>
          </header>
          <main>
            <FlatList
              className={styles.videos}
              source={quadro?.lives.nodes || []}
              colsxss={1}
              colsmd={2}
              cols={3}
              colsl={4}
              colsxl={8}
              renderItem={(item) => (
                <CardThumb
                  video={item.acf_data?.videoUrl}
                  title={item.title}
                  image={item.featuredImage?.node.mediaItemUrl
                    || item.acf_data.imagemDestacada?.mediaItemUrl}
                  excerpt={item.excerpt}
                  click={() => changeVideo(item.id)}
                />
              )}
            />
          </main>
        </Section>
      </Fluid>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const { nodes } = await core.lives.getQuadro(params.slug);
  const menus = await core.menus.getAll();
  const links = await core.links.getAll();

  nodes[0]?.lives?.nodes.sort((a, b) => (
    new Date(getISODateString(a.acf_data.dataDePublicacao)).getTime()
    - new Date(getISODateString(b.acf_data.dataDePublicacao)).getTime()
  ));

  return {
    props: {
      menus: menus.nodes || [],
      links: links.nodes || [],
      quadro: nodes[0] || {},
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { quadros } = await core.lives.getQuadros();
  quadros?.filter((item) => item.lives.nodes.lenght > 0);

  return {
    paths: quadros?.map((node) => `/lives-quadros/${node.slug}`) || [],
    fallback: true,
  };
}
