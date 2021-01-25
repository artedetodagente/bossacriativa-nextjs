import React from 'react';
import Section from '@/components/Section';
import CarouselGrid from '@/components/CarouselGrid';
import FlatList from '@/components/FlatList';
import CardThumb from '@/components/CardThumb';
import { useRouter } from 'next/router';
import CardFigure from '@/components/CardFigure';
import Fluid from '@/components/Fluid';
import core from '@/core';
import Schedule from '@/components/agenda';
import CarouselBanner from '@/components/CarouselBanner';
import Page from '@/components/Page';

export default function Home({
  mostras, posts, lives, menus, slides,
}) {
  const { push } = useRouter();

  console.log(process.env.REQUEST_TIME);

  return (
    <Page menus={menus}>
      <CarouselBanner source={slides} />
      <Fluid>
        <Section title="Mostra Virtual Bossa Criativa">
          <CarouselGrid
            source={mostras}
            renderItem={(item) => (
              <CardThumb
                video={item.acf_data?.videoUrl}
                title={item.title}
                excerpt={item.excerpt}
                click={() => push(`realidades/${item.slug}`)}
              />
            )}
          />
        </Section>
        <Section title="Notícias">
          <FlatList
            source={posts.slice(0, 3)}
            cols={3}
            colsl={4}
            colsxss={1}
            colsmd={2}
            colsxl={7}
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
        <Section title="Lives">
          <CarouselGrid
            source={lives}
            reverse
            renderItem={(item) => (
              <CardThumb
                video={item.acf_data.videoUrl}
                excerpt={item.excerpt}
                title={item.title}
                click={() => push(`lives/${item.slug}`)}
              />
            )}
          />
        </Section>
        <Section title="Calendário">
          <Schedule />
        </Section>
      </Fluid>
    </Page>
  );
}

export async function getStaticProps() {
  const lives = await core.lives.getAll();
  const posts = await core.posts.getAll();
  const mostras = await core.mostras.getAll();
  const slides = await core.slides.getAll();

  return {
    props: {
      mostras: mostras.nodes || [],
      posts: posts.nodes || [],
      lives: lives.nodes || [],
      slides: slides.nodes || [],
    },
    revalidate: process.env.REQUEST_TIME,
  };
}
