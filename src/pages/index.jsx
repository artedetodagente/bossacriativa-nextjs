import React, { useState } from 'react';
import Section from '@/components/Section';
import CarouselGrid from '@/components/CarouselGrid';
import FlatList from '@/components/FlatList';
import CardThumb from '@/components/CardThumb';
import { useRouter } from 'next/router';
import CardFigure from '@/components/CardFigure';
import Fluid from '@/components/Fluid';
import core from '@/core';
import CarouselBanner from '@/components/CarouselBanner';
import Page from '@/components/Page';
import styles from '@/styles/home.module.css';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import ModalPlayer from '@/components/ModalPlayer';

export default function Home({
  ultimasMostras, posts, ultimasLives, oficinas, menus, slides, home, links,
}) {
  const { push } = useRouter();
  const [modal, setModal] = useState({ player: false });
  const [video, setVideo] = useState('');

  function selectVideo(url) {
    setVideo(url);
    setModal({ ...modal, player: true });
  }

  return (
    <Page menus={menus} links={links}>
      <ModalPlayer
        open={modal.player}
        video={video}
        close={() => setModal({ ...modal, player: false })}
      />
      <CarouselBanner source={slides} />
      <div className={styles.description}>
        <div area="text">
          <p>
            No Bossa Criativa, arte, cultura e inclusão têm como palco a internet e patrimônios da
            humanidade. São mais de 180 artistas e educadores, de várias regiões do país, em
            apresentações, lives e oficinas de capacitação nas áreas de música, circo,
            artes visuais, dança, teatro e gestão cultural. Mais de 200 horas de conteúdo já
            estão no ar, com foco na diversidade e democratização da cultura.
          </p>
        </div>
        <div area="action" className={styles.botaovideo}>
          <button
            type="button"
            onClick={() => selectVideo(home[0].acf_data_home.info.videoUrl)}
          >
            <FaPlay />
            Vídeo Clipe
          </button>
        </div>
        <div area="action" className={styles.botaomais} >
          <button
            type="button"
            onClick={() => selectVideo(home[0].acf_data_home.info.saibaMais)}
          >
            Saiba Mais
          </button>
        </div>
        <figure>
          <Image
            src={require('@/images/logo.svg')}
            height="200px"
            width="200px"
          />
        </figure>
      </div>
      <Fluid>
        <Section title="Apresentações" link="/realidades">
          <CarouselGrid
            source={ultimasMostras}
            renderItem={(item) => (
              <CardThumb
                video={item.acf_data?.videoUrl}
                image={item.featuredImage?.node.mediaItemUrl}
                title={item.title}
                excerpt={item.excerpt}
                click={() => selectVideo(item.acf_data?.videoUrl)}
              />
            )}
          />
        </Section>
        <Section title="Notícias" link="/noticias">
          <FlatList
            className={styles.noticias}
            source={posts}
            colsxss={1}
            colsmd={1}
            cols={3}
            colsl={4}
            colsxl={8}
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
        <Section title="Oficinas" link="/oficinas">
          <CarouselGrid
            source={oficinas}
            renderItem={(item) => (
              <CardThumb
                excerpt={item.description}
                title={item.name}
                image={item.acf_data.imagemDestacada.mediaItemUrl}
                click={() => push(`oficinas/${item.slug}`)}
              />
            )}
          />
        </Section>
        <Section title="Lives" link="/lives">
          <CarouselGrid
            source={ultimasLives}
            reverse
            renderItem={(item) => (
              <CardThumb
                video={item.acf_data.videoUrl}
                excerpt={item.excerpt}
                title={item.title}
                click={() => push(`lives/${item.slug}`)}
              // h={200}
              />
            )}
          />
        </Section>
      </Fluid>
    </Page>
  );
}

export async function getStaticProps() {
  const ultimasLives = await core.lives.getLast(15);
  const ultimasMostras = await core.mostras.getLast(15);
  const posts = await core.posts.getAll(6);
  const slides = await core.slides.getAll();
  const menus = await core.menus.getAll();
  const links = await core.links.getAll();
  const home = await core.pages.getHome();
  const oficinas = await core.oficinas.getAll();
  const filterSlides = slides.nodes.filter((item) => {
    if (item.acf_chamada_slider?.bannerHomeDataEntrada === null) return false;
    const [startDay, startMonth, startYear] = item.acf_chamada_slider?.bannerHomeDataEntrada.split(' ')[0].split('/');
    const [endDay, endMonth, endYear] = item.acf_chamada_slider?.bannerHomeDataSaida.split(' ')[0].split('/');
    return new Date().getTime() >= new Date(`${startYear}-${startMonth}-${startDay}`).getTime()
      && new Date().getTime() <= new Date(`${endYear}-${endMonth}-${endDay}`).getTime();
  });
  const randOficinas = (ofc, qtd) => {
    let j;
    while (ofc && ofc.length > qtd) {
      j = Math.floor(Math.random() * (ofc.length + 1));
      ofc.splice(j, 1);
    }
    return ofc.sort(() => Math.random() - 0.5);
  };

  return {
    props: {
      ultimasMostras: ultimasMostras.nodes || [],
      posts: posts.nodes || [],
      ultimasLives: ultimasLives.nodes || [],
      slides: filterSlides || [],
      home: home.nodes || [],
      menus: menus.nodes || [],
      links: links.nodes || [],
      oficinas: randOficinas(oficinas.nodes, 15) || [],
    },
    revalidate: 1,
  };
}
