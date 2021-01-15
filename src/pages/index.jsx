import React from 'react';
import Section from '@/components/Section';
import CarouselGrid from '@/components/CarouselGrid';
import ListCard from '@/components/ListCard';
import CardThumb from '@/components/CardThumb';
import { useRouter } from 'next/router';
import CardImage from '@/components/CardImage';
import CardText from '@/components/CardText';
import Fluid from '@/components/Fluid';
import core from '@/core';
import Schedule from './schedule';
import CarouselBanner from '../components/CarouselBanner';

export default function Home({
  mostras, posts, lives,
}) {
  const { push } = useRouter();

  return (
    <main>
      <CarouselBanner />
      <Fluid>
        <Section title="Mostra Virtual Bossa Criativa">
          <CarouselGrid
            source={mostras}
            renderItem={(item) => (
              <CardImage
                image={item.image}
                title={item.title}
                excerpt={item.excerpt}
                click={() => push(`realidades/${item.slug}`)}
              />
            )}
          />
        </Section>
        <Section title="Notícias">
          <ListCard
            source={posts}
            renderItem={(item) => (
              <CardText
                title={item.title}
                excerpt={item.excerpt}
                image={item.photo}
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
    </main>
  );
}

export async function getStaticProps() {
  const lives = await core.lives.getAll();
  const posts = await core.posts.getAll();
  const mostras = await core.mostras.getAll();

  return {
    props: {
      mostras: mostras.nodes || [],
      posts: posts.nodes || [],
      lives: lives.nodes || [],
    },
    revalidate: process.env.REQUEST_TIME,
  };
}
