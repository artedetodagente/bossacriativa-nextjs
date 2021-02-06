import React, { useEffect, useRef, useState } from 'react';
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
import ItemHeaderList from '@/components/ItemHeaderList';
import ItemList from '@/components/ItemList';

export default function WorkshopSlug({ workshop, menus }) {
  const content = useRef(null);
  const [lesson, setLesson] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState('todos');

  useEffect(() => {
    const autors = workshop?.oficinas.nodes
      .filter((item) => item.acf_data.autor !== null)
      .reduce((acc, cur) => [...acc, cur.acf_data.autor], [])
      .filter((item, i, arr) => arr.slice(0, i).findIndex((it) => it.title === item.title) === -1);
    setTeachers(autors ? [{ title: 'Todos', slug: 'todos' }, ...autors] : []);
    content.current.innerHTML = workshop.acf_data?.descricaoCompleta;
  }, []);

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
        >
          <Fluid className={styles.expansibledLayout}>
            <ul>
              <ItemHeaderList title="Conteúdo Programático" />
              <ItemHeaderList title="Professores" />
              {
                teachers.map((item, index) => item.title !== 'Todos' && <ItemList key={index} title={item.title} />)
              }
            </ul>
            <div>
              <h1>Conteúdo Programático</h1>
              <div ref={content} />
            </div>
          </Fluid>
        </Expansibled>
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
          source={
            teacher !== 'todos' ? workshop?.oficinas.nodes.filter(
              (item) => item.acf_data.autor && item.acf_data.autor.slug !== teacher,
            ) : workshop?.oficinas.nodes || []
          }
          filters={teachers}
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
              id={item.slug}
              name={item.title}
              selected={teacher === item.slug}
              click={() => setTeacher(item.slug)}
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
  const { nodes } = await core.oficinas.getAll();
  return {
    paths: nodes.map((node) => `/oficinas/${node.slug}`) || [],
    fallback: true,
  };
}
