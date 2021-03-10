import React, { useEffect, useRef, useState } from 'react';
import Section from '@/components/Section';
import Breadcrumb from '@/components/Breadcrumb';
import core from '@/core';
import Fluid from '@/components/Fluid';
import YouEmbed from '@/components/YouEmbed';
import FlatList from '@/components/FlatList';
import CardThumb from '@/components/CardThumb';
import Page from '@/components/Page';
import Expansibled from '@/components/Expansibled';
import ItemHeaderList from '@/components/ItemHeaderList';
import ItemList from '@/components/ItemList';
import styles from '@/styles/lives-quadro-slug.module.css';

export default function QuadroSlug({ quadro, menus, links }) {
  const content = useRef(null);
  const [video, setVideo] = useState(0);

  // useEffect(() => {
  //   const authors = workshop?.oficinas.nodes
  //     .filter((item) => item.acf_data.autor !== null)
  //     .reduce((acc, cur) => [...acc, cur.acf_data.autor], [])
  //     .filter((item, i, arr) => arr.slice(0, i).findIndex((it) => it.title === item.title) === -1);
  //   setTeachers(authors ? [{ title: 'Todos', slug: 'todos' }, ...authors] : []);
  //   content.current.innerHTML = workshop.acf_data?.descricaoCompleta;
  // }, []);

  async function changeVideo(id) {
    const index = quadro?.lives.nodes.findIndex((item) => item.id === id);
    setVideo(index);
  }

  // function changeContent(info) {
  //   setTitle(info.title);
  //   content.current.innerHTML = info.content;
  // }

  return (
    <Page menus={menus} links={links}>
      <Breadcrumb />
      <Fluid className={styles.layout}>
        <div className={styles.player}>
          <YouEmbed
            url={quadro?.lives.nodes[video]?.acf_data.videoUrl}
          />
        </div>
        <Section title="Próximos Vídeos" className={styles.listContainer}>
          <FlatList
            className={styles.list}
            source={quadro?.lives.nodes.slice(video + 1, video + 3) || []}
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
  const { nodes } = await core.lives.getQuadro(params.slug);
  const menus = await core.menus.getAll();
  const links = await core.links.getAll();

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
  const { nodes } = await core.oficinas.getAll();
  return {
    paths: nodes.map((node) => `/lives-quadros/${node.slug}`) || [],
    fallback: true,
  };
}
