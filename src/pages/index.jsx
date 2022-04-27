import React, { useState, useEffect, useRef } from 'react';
import Section from '@/components/Section';
import CarouselGrid from '@/components/CarouselGrid';
import FlatList from '@/components/FlatList';
import CardImageWithTitle from '@/components/CardImageWithTitle';
import { useRouter } from 'next/router';
import CardImageWithText from '@/components/CardImageWithText';
import Fluid from '@/components/Fluid';
import core from '@/core';
import CarouselBanner from '@/components/CarouselBanner';
import Page from '@/components/Page';
import styles from '@/styles/home.module.css';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import ModalPlayer from '@/components/ModalPlayer';
import CardImageWithDate from '@/components/CardImageWithDate';
import Title from '@/components/Title';
import CarouselNews from '@/components/CarouselNews';

export default function Home({
  ultimasMostras, posts, ultimasLives, oficinas, menus, slides, home, links, events, menusRodape,
}) {
  const { push } = useRouter();
  const [modal, setModal] = useState({ player: false });
  const [video, setVideo] = useState('');

  function selectVideo(url) {
    setVideo(url);
    setModal({ ...modal, player: true });
  }

  return (
    <Page menus={menus} links={links} menusRodape={menusRodape}>
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
            onClick={() => push('/projeto/o-que-e-o-bossa-criativa')}
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
        <Section>
          <header>
            <Title link="/agenda">Agenda</Title>
          </header>
          <main>
            <CarouselGrid
              source={events.slice(0, 15)}
              reverse
              renderItem={(item) => (
                <CardImageWithDate
                  image={item.featuredImage?.node.mediaItemUrl}
                  title={item.title}
                  excerpt={item.excerpt}
                  day={parseInt(item.acf_data_evento.dataDoEvento.split(' ')[0].split('/')[0], 10)}
                  month={parseInt(item.acf_data_evento.dataDoEvento.split(' ')[0].split('/')[1], 10) - 1}
                  // /* click={() => selectVideo(item.acf_data?.videoUrl)} */
                />
              )}
            />
          </main>
        </Section>
        <Section>
          <header>
            <Title link="/realidades">Apresentações</Title>
          </header>
          <main>
            <CarouselGrid
              source={ultimasMostras}
              renderItem={(item) => (
                <CardImageWithTitle
                  video={item.acf_data?.videoUrl}
                  image={item.featuredImage?.node.mediaItemUrl}
                  title={item.title}
                  excerpt={item.excerpt}
                  click={() => selectVideo(item.acf_data?.videoUrl)}
                />
              )}
            />
          </main>
        </Section>
        <Section>
          <header>
            <Title link="/noticias">Notícias</Title>
          </header>
          <main>
            <div className={styles.containerNoticias}>
              <CarouselNews /* para mobile */
                area="a1"
                source={[posts[0], posts[1], posts[2]]}
                renderItem={(item) => (
                  <CardImageWithText
                    title={item?.title}
                    excerpt={item?.acf_chamada_post?.chamadaHome}
                    image={item?.featuredImage?.node?.mediaItemUrl}
                    click={() => push(`noticias/${item.slug}`)}
                  />
                )}
              />
              <CarouselNews
                area="a1"
                source={[posts[0], posts[3], posts[6]]}
                renderItem={(item) => (
                  <CardImageWithText
                    title={item?.title}
                    excerpt={item?.acf_chamada_post?.chamadaHome}
                    image={item?.featuredImage?.node?.mediaItemUrl}
                    click={() => push(`noticias/${item.slug}`)}
                  />
                )}
              />
              <CarouselNews
                area="a2"
                source={[posts[1], posts[4], posts[7]]}
                renderItem={(item) => (
                  <CardImageWithText
                    title={item?.title}
                    excerpt={item?.acf_chamada_post?.chamadaHome}
                    image={item?.featuredImage?.node?.mediaItemUrl}
                    click={() => push(`noticias/${item.slug}`)}
                  />
                )}
              />
              <CarouselNews
                area="a3"
                source={[posts[2], posts[5], posts[8]]}
                renderItem={(item) => (
                  <CardImageWithText
                    title={item?.title}
                    excerpt={item?.acf_chamada_post?.chamadaHome}
                    image={item?.featuredImage?.node?.mediaItemUrl}
                    click={() => push(`noticias/${item.slug}`)}
                  />
                )}
              />
            </div>
          </main>
        </Section>
        <Section>
          <header>
            <Title link="/oficinas">Oficinas</Title>
          </header>
          <main>
            <CarouselGrid
              source={oficinas}
              renderItem={(item) => (
                <CardImageWithTitle
                  excerpt={item.description}
                  title={item.name}
                  image={item.acf_data.imagemDestacada.mediaItemUrl}
                  click={() => push(`oficinas/${item.slug}`)}
                />
              )}
            />
          </main>
        </Section>
        <Section>
          <header>
            <Title link="/lives">Lives</Title>
          </header>
          <main>
            <CarouselGrid
              source={ultimasLives}
              reverse
              renderItem={(item) => (
                <CardImageWithTitle
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
          </main>
        </Section>
      </Fluid>
    </Page>
  );
}

export async function getStaticProps() {
  const ultimasLives = await core.lives.getLast(15);
  const ultimasMostras = await core.mostras.getLast(15);
  const events = await core.eventos.getAll();
  const posts = await core.posts.getAll(9); //comentário para forçar o rebuild
  const slides = await core.slides.getAll();
  const menus = await core.menus.getAll();
  const menusRodape = await core.menus.getAll('menu_rodape');
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
  const lastEvents = events?.nodes
    .filter((item) => {
      const [d, m, y] = item.acf_data_evento.dataDoEvento.split(' ')[0].split('/');
      const dataEvento = new Date(`${y}-${m}-${d}`).getTime();
      const hoje = new Date(new Date().toISOString().substr(0, 10)).getTime();
      return dataEvento >= hoje;
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
      menusRodape: menusRodape?.nodes || [],
      links: links.nodes || [],
      oficinas: randOficinas(oficinas.nodes, 15) || [],
      events: lastEvents || [],
    },
    revalidate: 1,
  };
}
