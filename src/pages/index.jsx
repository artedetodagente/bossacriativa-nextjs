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
<<<<<<< HEAD
import CardImage from '@/components/CardImage';
=======
import styles from '@/styles/home.module.css';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
>>>>>>> c41c4b7d99b2127adf13c5765ec89b75e33a1efc

export default function Home({
  mostras, posts, lives, menus, slides, eventos,
}) {
  const { push } = useRouter();

  return (
    <Page menus={menus}>
      <CarouselBanner source={slides} />
      <div className={styles.description}>
        <div>
          <p>
            No Bossa Criativa, arte, cultura e inclusão têm como palco a internet e patrimônios da
            humanidade. São mais de 180 artistas e educadores, de várias regiões do país, em
            apresentações, lives e oficinas de capacitação nas áreas de música, circo,
            artes visuais, dança, teatro e gestão cultural. Mais de 200 horas de conteúdo já
            estão no ar, com foco na diversidade e democratização da cultura.
          </p>
        </div>
        <div>
          <button type="button">
            <FaPlay />
            Vídeo Clipe
          </button>
          <button type="button">
            Saiba Mais
          </button>
        </div>
        <figure>
          <Image
            src={require('@/images/logo.svg')}
            height="250px"
            width="250px"
          />
        </figure>
      </div>
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
          <Schedule 
            source={eventos}
            renderItem={(item) => (
              <CardImage 
                title={item.title}
                excerpt={item.excerpt}
                click={null}
                image={null}
                h={350}
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
  const mostras = await core.mostras.getAll();
  const slides = await core.slides.getAll();
  const eventos = await core.eventos.getAll();
  const menus = await core.menus.getAll();

  return {
    props: {
      mostras: mostras.nodes || [],
      posts: posts.nodes || [],
      lives: lives.nodes || [],
      slides: slides.nodes || [],
      eventos: eventos.nodes || [],
      menus: menus.nodes || [],
    },
    revalidate: 1,
  };
}
