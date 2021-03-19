import React from 'react';
import Page from '@/components/Page';
import Breadcrumb from '@/components/Breadcrumb';
import Info from '@/components/Info';
import Section from '@/components/Section';
import Fluid from '@/components/Fluid';
import FlatList from '@/components/FlatList';
import CardText from '@/components/CardText';
import CardIcon from '@/components/CardIcon';
import { BsNewspaper } from 'react-icons/bs';
import CardHorizontal from '@/components/CardHorizontal';
import core from '@/core';
import ButtonsNavigations from '@/components/ButtonsNavigations';
import Title from '@/components/Title';
import styles from '@/styles/imprensa.module.css';

export default function Press({
  releases, clippings, menus, links,
}) {
  const contacts = [
    { title: 'Funarte - Assessoria de Comunicação:', text: 'ascomfunarte@funarte.gov.br' },
    { title: 'Contato de Assessoria de Imprensa:', text: 'imprensa@musica.ufrj.br' },
  ];

  function dowloadRelease(url, name) {
    const link = document.createElement('a');
    link.setAttribute('download', name);
    link.setAttribute('href', url);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function navigate(url) {
    window.location.href = url;
  }

  return (
    <Page menus={menus} links={links}>
      <Breadcrumb />
      <Info title="Imprensa" />
      <Fluid>
        <Section>
          <header>
            <Title>Contatos</Title>
          </header>
          <main>
            <FlatList
              source={contacts}
              renderItem={(item) => (
                <CardText
                  gap="20px"
                  title={item.title}
                  text={item.text}
                />
              )}
            />
          </main>
        </Section>
        <Section className={styles.release}>
          <header>
            <div>
              <Title>Releases</Title>
            </div>
            <div>
              <ButtonsNavigations />
            </div>
          </header>
          <main>
            <FlatList
              source={releases}
              renderItem={(item) => (
                <CardIcon
                  icon={<BsNewspaper />}
                  text={item.title}
                  click={() => dowloadRelease(item.acf_link_release.arquivo.link, item.title)}
                />
              )}
            />
          </main>
        </Section>
        <Section className={styles.clipping}>
          <header>
            <div>
              <Title>Clippings</Title>
            </div>
            <div>
              <ButtonsNavigations />
            </div>
          </header>
          <main>
            <FlatList
              cols={3}
              source={clippings}
              renderItem={(item) => (
                <CardHorizontal
                  image={item?.featuredImage?.node?.mediaItemUrl}
                  title={item.title}
                  text={item.excerpt}
                  click={() => navigate(item.acf_link_clipping?.linkDaNoticia)}
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
  const releases = await core.releases.getAll();
  const clippings = await core.clippings.getAll();
  const menus = await core.menus.getAll();
  const links = await core.links.getAll();

  return {
    props: {
      releases: releases.nodes || [],
      clippings: clippings.nodes || [],
      menus: menus.nodes || [],
      links: links.nodes || [],
    },
    revalidate: 1,
  };
}
