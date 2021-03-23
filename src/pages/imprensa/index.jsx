import React, { useState } from 'react';
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
  releases, releasesPage, clippings, clippingsPage, menus, links,
}) {
  const contacts = [
    { title: 'Funarte - Assessoria de Comunicação:', text: 'ascomfunarte@funarte.gov.br' },
    { title: 'Contato de Assessoria de Imprensa:', text: 'imprensa@musica.ufrj.br' },
  ];
  const [listClippings, setListClippings] = useState([...clippings]);
  const [listReleases, setListReleases] = useState([...releases]);
  const [pageRelease, setPageRelease] = useState({ ...releasesPage });
  const [pageClipping, setPageClipping] = useState({ ...clippingsPage });

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

  async function navigateReleases(next) {
    let list = [];
    if (pageRelease.hasNextPage && next) {
      list = await core.releases.getAllWithAfter(pageRelease.endCursor);
      setListReleases(list.nodes);
      setPageRelease(list.pageInfo);
    } else if (pageRelease.hasPreviousPage && !next) {
      list = await core.releases.getAllWithBefore(pageRelease.startCursor);
      setListReleases(list.nodes);
      setPageRelease(list.pageInfo);
    }
  }

  async function navigateClippings(next) {
    let list = [];
    if (pageClipping.hasNextPage && next) {
      list = await core.clippings.getAllWithAfter(pageClipping.endCursor);
      setListClippings(list.nodes);
      setPageClipping(list.pageInfo);
    } else if (pageClipping.hasPreviousPage && !next) {
      list = await core.clippings.getAllWithBefore(pageClipping.startCursor);
      setListClippings(list.nodes);
      setPageClipping(list.pageInfo);
    }
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
              <ButtonsNavigations
                onNext={() => navigateReleases(true)}
                onPrev={() => navigateReleases(false)}
              />
            </div>
          </header>
          <main>
            <FlatList
              source={listReleases}
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
              <ButtonsNavigations
                onNext={() => navigateClippings(true)}
                onPrev={() => navigateClippings(false)}
              />
            </div>
          </header>
          <main>
            <FlatList
              cols={3}
              source={listClippings}
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
  const releases = await core.releases.getAllWithAfter();
  const clippings = await core.clippings.getAllWithAfter();
  const menus = await core.menus.getAll();
  const links = await core.links.getAll();

  return {
    props: {
      releases: releases.nodes || [],
      releasesPage: releases.pageInfo || {},
      clippings: clippings.nodes || [],
      clippingsPage: clippings.pageInfo || {},
      menus: menus.nodes || [],
      links: links.nodes || [],
    },
    revalidate: 1,
  };
}
