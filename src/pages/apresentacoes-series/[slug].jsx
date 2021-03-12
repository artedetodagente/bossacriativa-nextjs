import React, { useState } from 'react';
import Section from '@/components/Section';
import Breadcrumb from '@/components/Breadcrumb';
import core from '@/core';
import Fluid from '@/components/Fluid';
import YouEmbed from '@/components/YouEmbed';
import FlatList from '@/components/FlatList';
import CardThumb from '@/components/CardThumb';
import Page from '@/components/Page';
import styles from '@/styles/apresentacoes-series-slug.module.css';

export default function SerieSlug({ serie, menus, links }) {
  const [video, setVideo] = useState(0);

  async function changeVideo(id) {
    const index = serie?.mostrasVirtuais.nodes.findIndex((item) => item.id === id);
    setVideo(index);
  }

  return (
    <Page menus={menus} links={links}>
      <Breadcrumb />
      <Fluid className={styles.layout}>
        <div className={styles.player}>
          <YouEmbed
            url={serie?.mostrasVirtuais.nodes[video]?.acf_data.videoUrl}
          />
        </div>
        <Section title="Próximos Vídeos" className={styles.listContainer}>
          <FlatList
            className={styles.list}
            source={serie?.mostrasVirtuais.nodes.slice(video + 1, video + 3) || []}
            colsxss={2}
            cols={1}
            renderItem={(item) => (
              <CardThumb
                video={item.acf_data?.videoUrl}
                image={item.featuredImage?.node.mediaItemUrl}
                title={item.title}
                excerpt={item.excerpt}
                click={() => changeVideo(item.id)}
              />
            )}
          />
        </Section>
        <Section title="Todos os vídeos" className={styles.videosContainer}>
          <FlatList
            className={styles.videos}
            source={serie?.mostrasVirtuais.nodes || []}
            colsxss={1}
            colsmd={2}
            cols={3}
            colsl={4}
            colsxl={8}
            renderItem={(item) => (
              <CardThumb
                video={item.acf_data?.videoUrl}
                title={item.title}
                excerpt={item.excerpt}
                click={() => changeVideo(item.id)}
              />
            )}
          />
        </Section>
      </Fluid>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const { nodes } = await core.mostras.getSerie(params.slug);
  const menus = await core.menus.getAll();
  const links = await core.links.getAll();

  return {
    props: {
      menus: menus.nodes || [],
      links: links.nodes || [],
      serie: nodes[0] || {},
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { series } = await core.mostras.getSeries();
  series?.filter((item) => item.mostrasVirtuais.nodes.length > 0);

  return {
    paths: series?.map((node) => `/apresentacoes-series/${node.slug}`) || [],
    fallback: true,
  };
}
