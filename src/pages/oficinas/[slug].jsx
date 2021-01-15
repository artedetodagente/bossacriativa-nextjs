import React, { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Info from '@/components/Info';
import core from '@/core';
import Fluid from '@/components/Fluid';
import YouEmbed from '@/components/YouEmbed';
import ListCard from '@/components/ListCard';
import styles from '@/styles/oficinas-slug.module.css';
import CardThumb from '@/components/CardThumb';

export default function WorkshopSlug({ workshop }) {
  const [lesson, setLesson] = useState(0);
  const [teacher, setTeacher] = useState(0);

  return (
    <main>
      <Breadcrumb />
      <Info
        title={workshop?.name}
        text={workshop?.description}
      />
      <Fluid className={styles.layout}>
        <div className={styles.player}>
          <YouEmbed
            url={workshop?.oficinas.nodes[lesson]?.acf_data.videoUrl}
          />
        </div>
        {
          workshop?.oficinas.nodes.slice(lesson + 1).length > 0 && (
            <ListCard
              title="Próximas Aulas"
              className={styles.list}
              source={workshop.oficinas.nodes.slice(lesson, lesson + 2)}
              cols={1}
              renderItem={(item) => (
                <CardThumb
                  video=""
                  title={item.name}
                  excerpt={item.description}
                />
              )}
            />
          )
        }
        <ListCard
          title="Todas as Aulas"
          className={styles.videos}
          source={[]}
          renderItem={(item) => (
            <CardThumb
              video=""
              title={item.name}
              excerpt={item.description}
            />
          )}
        />
      </Fluid>
    </main>
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
