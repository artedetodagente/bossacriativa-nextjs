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
import CardDate from '@/components/CardDate';

export default function Home({
  ultimasMostras, posts, ultimasLives, oficinas, menus, slides, home, links, events,
}) {
  const { push } = useRouter();
  const [modal, setModal] = useState({ player: false });
  const [video, setVideo] = useState('');

  function selectVideo(url) {
    setVideo(url);
    setModal({ ...modal, player: true });
  }

  // console.log(events);

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
            No Bossa Criativa, arte, cultura e patrimônios da humanidade
            têm como palco a internet. São mais de 180 artistas e educadores,
            de várias regiões do país, em apresentações, oficinas de capacitação
            e lives nas áreas de música, circo, artes visuais, dança, teatro e
            gestão cultural. Mais de 200 horas de conteúdo já estão no ar, com
            foco na diversidade, inclusão e democratização da cultura.
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
        <div area="action" className={styles.botaomais}>
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
        <Section title="Programação" link="/agenda">
          <CarouselGrid
            source={events}
            renderItem={(item) => (
              <CardDate
                image={item.featuredImage?.node.mediaItemUrl}
                title={item.title}
                excerpt={item.excerpt}
                day={parseInt(item.acf_data_evento.dataDoEvento.split(' ')[0].split('/')[0], 10)}
                month={parseInt(item.acf_data_evento.dataDoEvento.split(' ')[0].split('/')[1], 10)}
                click={() => selectVideo(item.acf_data?.videoUrl)}
              />
            )}
          />
        </Section>
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
            colsl={3}
            colsxl={3}
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
                image={item.featuredImage?.node.mediaItemUrl
                  || item.acf_data.imagemDestacada?.mediaItemUrl}
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
  const events = await core.eventos.getAll();
  const posts = await core.posts.getAll(3);
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
  const lastEvents = events?.nodes.slice(0, 15)
    .filter((item) => {
      const [d, m, y] = item.acf_data_evento.dataDoEvento.split(' ')[0].split('/');
      return new Date(`${y}-${m}-${d}`).getTime() >= new Date().getTime();
    })
    .sort((a, b) => {
      const [da, ma, ya] = a.acf_data_evento.dataDoEvento.split(' ')[0].split('/');
      const [db, mb, yb] = b.acf_data_evento.dataDoEvento.split(' ')[0].split('/');
      return new Date(`${ya}-${ma}-${da}`).getTime() - new Date(`${yb}-${mb}-${db}`).getTime();
    });

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
      events: lastEvents || [],
    },
    revalidate: 1,
  };
}
