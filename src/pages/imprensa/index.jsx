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

export default function Press({ releases, clippings, menus }) {
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
    <Page menus={menus}>
      <Breadcrumb />
      <Info title="Imprensa" />
      <Fluid>
        <Section title="Clipping">
          <FlatList
            cols={3}
            source={clippings}
            renderItem={(item) => (
              <CardHorizontal
                image={item?.featuredImage?.node?.mediaItemUrl}
                title={item.title}
                text={item.excerpt}
                click={() => navigate(item.uri)}
              />
            )}
          />
        </Section>
        <Section title="Releases">
          <FlatList
            source={releases}
            renderItem={(item) => (
              <CardIcon
                icon={<BsNewspaper />}
                text={item.title}
                click={() => dowloadRelease(item.acf_link_release.arquivo.uri, item.title)}
              />
            )}
          />
        </Section>
        <Section title="Contatos">
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
        </Section>
      </Fluid>
    </Page>
  );
}

export async function getStaticProps() {
  const releases = await core.releases.getAll();
  const clippings = await core.clippings.getAll();
  const menus = await core.menus.getAll();

  return {
    props: {
      releases: releases.nodes || [],
      clippings: clippings.nodes || [],
      menus: menus.nodes || [],
    },
    revalidate: 1,
  };
}
