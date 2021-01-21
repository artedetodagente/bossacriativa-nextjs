import React, { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Info from '@/components/Info';
import core from '@/core';
import Fluid from '@/components/Fluid';
import YouEmbed from '@/components/YouEmbed';
import FlatList from '@/components/FlatList';
import styles from '@/styles/oficinas-slug.module.css';
import CardThumb from '@/components/CardThumb';
import Option from '@/components/Option';
import Page from '@/components/Page';
import Expansibled from '@/components/Expansibled';

export default function WorkshopSlug({ workshop, menus }) {
  const [lesson] = useState(0);
  // const [teacher, setTeacher] = useState(0);
  const [category, setCategory] = useState(0);

  async function changeCategory(value) {
    setCategory(value);
  }

  return (
    <Page menus={menus}>
      <Breadcrumb />
      <Info
        title={workshop?.name}
        text={workshop?.description}
      >
        <Expansibled
          showText="Conheça os professores e mais"
          hiddenText="Fechar"
        />
      </Info>
      <Fluid className={styles.layout}>
        <div className={styles.player}>
          <YouEmbed
            url={workshop?.oficinas.nodes[lesson]?.acf_data.videoUrl}
          />
        </div>
        <FlatList
          title="Próximas Aulas"
          className={styles.list}
          source={workshop?.oficinas.nodes.slice(lesson, lesson + 2) || []}
          cols={1}
          renderItem={(item) => (
            <CardThumb
              video={item.acf_data?.videoUrl}
              title={item.title}
              excerpt={item.excerpt}
            />
          )}
        />
        <FlatList
          title="Todas as Aulas"
          className={styles.videos}
          source={workshop?.oficinas.nodes || []}
          renderItem={(item) => (
            <CardThumb
              video={item.acf_data?.videoUrl}
              title={item.title}
              excerpt={item.excerpt}
            />
          )}
          renderFilter={(item) => (
            <Option
              id={item.termTaxonomyId}
              name={item.name}
              selected={category === item.termTaxonomyId}
              click={changeCategory}
            />
          )}
        />
      </Fluid>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const data = await core.oficinas.getOne(params.slug);
  return {
    props: {
      workshop: data.nodes[0] || {},
    },
    revalidate: process.env.REQUEST_TIME,
  };
}

export async function getStaticPaths() {
  const data = await core.oficinas.getAll();
  return {
    paths: data.nodes.map((node) => `/oficinas/${node.slug}`) || [],
    fallback: true,
  };
}
