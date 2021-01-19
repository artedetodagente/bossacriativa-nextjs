import React from 'react';
import Section from '@/components/Section';
import CarouselGrid from '@/components/CarouselGrid';
import ListCard from '@/components/ListCard';
import CardThumb from '@/components/CardThumb';
import { useRouter } from 'next/router';
import CardText from '@/components/CardText';
import Fluid from '@/components/Fluid';
import core from '@/core';
import Schedule from '@/components/agenda';
import CarouselBanner from '@/components/CarouselBanner';

export default function Home({
  mostras, posts, lives,slides,
}) {
  const { push } = useRouter();

  return (
    <main>
      <CarouselBanner source={slides}/>
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
          <ListCard
            source={posts.slice(0, 3)}
            cols={3}
            renderItem={(item) => (
              <CardText
                title={item.title}
                excerpt={item.excerpt}
                image={item.featuredImage.node?.mediaItemUrl}
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
