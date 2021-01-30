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
  const [lesson, setLesson] = useState(0);
  // const [teacher, setTeacher] = useState(0);
  const [category, setCategory] = useState(0);

  async function changeCategory(value) {
    setCategory(value);
  }

  async function changeLeasson(index) {
    setLesson(index);
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
          source={workshop?.oficinas.nodes.slice(lesson + 1, lesson + 3) || []}
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
          renderItem={(item, index) => (
            <CardThumb
              video={item.acf_data?.videoUrl}
              title={item.title}
              excerpt={item.excerpt}
              click={() => changeLeasson(index)}
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
  const { nodes } = await core.oficinas.getOne(params.slug);
  const menus = await core.menus.getAll();

  return {
    props: {
      menus: menus.nodes || [],
      workshop: nodes[0] || {},
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { nodes } = await core.oficinas.getAll({ param: 'before' });
  return {
    paths: nodes.map((node) => `/oficinas/${node.slug}`) || [],
    fallback: true,
  };
}
