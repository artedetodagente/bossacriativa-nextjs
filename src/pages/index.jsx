import React from 'react';
import Page from '@/components/Page';
import Section from '@/components/Section';
import CarouselGrid from '@/components/CarouselGrid';
import CardList from '@/components/CardList';
import CardThumb from '@/components/CardThumb';
import { useRouter } from 'next/router';
import CardImage from '@/components/CardImage';
import CardText from '@/components/CardText';
import Fluid from '@/components/Fluid';
import core from '@/core';

export default function Home({ realities, posts, lives }) {
  const { push } = useRouter();

  return (
    <Page>
      <Fluid>
        <Section title="Mostra Virtual Bossa Criativa">
          <CarouselGrid
            source={realities}
            renderItem={(item) => (
              <CardImage
                image={item.image}
                title={item.title}
                excerpt={item.excerpt}
                click={() => push(`mostras/${item.slug}`)}
              />
            )}
          />
        </Section>
        <Section title="Notícias">
          <CardList
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
      </Fluid>
    </Page>
  );
}

export async function getStaticProps() {
  const lives = await core.lives.getAll();
  const posts = await core.posts.getAll();
  const realities = await core.mostras.getAll();
  return {
    props: {
      realities: realities.nodes || [],
      posts: posts.nodes || [],
      lives: lives.nodes || [],
    },
    revalidate: process.env.REQUEST_TIME,
  };
}
