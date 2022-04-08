import React, { useState } from "react";
import { BsNewspaper } from "react-icons/bs";
import core from "@/core";
import styles from "@/styles/imprensa.module.css";
import Page from "@/components/Page";
import Breadcrumb from "@/components/Breadcrumb";
import Info from "@/components/Info";
import Section from "@/components/Section";
import Fluid from "@/components/Fluid";
import FlatList from "@/components/FlatList";
import CardText from "@/components/CardText";
import CardIcon from "@/components/CardIcon";
import CardHorizontal from "@/components/CardHorizontal";
import ButtonsNavigations from "@/components/ButtonsNavigations";
import Title from "@/components/Title";

export default function Press({
  releases,
  releasesPage,
  clippings,
  clippingsPage,
  menus,
  links,
  menusRodape,
}) {
  const contacts = [
    {
      title: "Funarte - Assessoria de Comunicação:",
      text: "ascomfunarte@funarte.gov.br",
    },
    {
      title: "Contato de Assessoria de Imprensa:",
      text: "imprensa@musica.ufrj.br",
    },
  ];
  const [indexClippings, setIndexClippings] = useState(0);
  const [indexReleases, setIndexReleases] = useState(0);
  // const [pageRelease, setPageRelease] = useState({ ...releasesPage });
  // const [pageClipping, setPageClipping] = useState({ ...clippingsPage });

  function dowloadRelease(url, name) {
    const link = document.createElement("a");
    link.setAttribute("download", name);
    link.setAttribute("href", url);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function navigate(url) {
    window.location.href = url;
  }

  // async function navigateReleases(next) {
  //   let list = [];
  //   if (pageRelease.hasNextPage && next) {
  //     // list = await core.releases.getAllWithAfter(pageRelease.endCursor);
  //     // setListReleases(list.nodes);
  //     // setPageRelease(list.pageInfo);
  //     // setListReleases(releases.findIndex((item) => ))
  //   } else if (pageRelease.hasPreviousPage && !next) {
  //     // list = await core.releases.getAllWithBefore(pageRelease.startCursor);
  //     // setListReleases(list.nodes);
  //     // setPageRelease(list.pageInfo);
  //   }
  // }

  // async function navigateClippings(next) {
  //   let list = [];
  //   if (pageClipping.hasNextPage && next) {
  //     list = await core.clippings.getAllWithAfter(pageClipping.endCursor);
  //     setListClippings(list.nodes);
  //     setPageClipping(list.pageInfo);
  //   } else if (pageClipping.hasPreviousPage && !next) {
  //     list = await core.clippings.getAllWithBefore(pageClipping.startCursor);
  //     setListClippings(list.nodes);
  //     setPageClipping(list.pageInfo);
  //   }
  // }

  return (
    <Page menus={menus} links={links} menusRodape={menusRodape}>
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
                <CardText gap="20px" title={item.title} text={item.text} />
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
                onNext={() =>
                  indexReleases + 8 < releases.length &&
                  setIndexReleases(indexReleases + 8)
                }
                onPrev={() =>
                  indexReleases - 8 >= 0 && setIndexReleases(indexReleases - 8)
                }
              />
            </div>
          </header>
          <main>
            <FlatList
              source={releases.slice(indexReleases, indexReleases + 8)}
              renderItem={(item) => (
                <CardIcon
                  icon={<BsNewspaper />}
                  text={item.title}
                  click={() =>
                    dowloadRelease(
                      item.acf_link_release.arquivo.mediaItemUrl,
                      item.title
                    )
                  }
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
                onNext={() =>
                  indexClippings + 6 < clippings.length &&
                  setIndexClippings(indexClippings + 6)
                }
                onPrev={() =>
                  indexClippings - 6 >= 0 &&
                  setIndexClippings(indexClippings - 6)
                }
              />
            </div>
          </header>
          <main>
            <FlatList
              cols={3}
              source={clippings.slice(indexClippings, indexClippings + 6)}
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
  const menusRodape = await core.menus.getAll("menu_rodape");
  const links = await core.links.getAll();

  return {
    props: {
      releases: releases.nodes || [],
      releasesPage: releases.pageInfo || {},
      clippings: clippings.nodes || [],
      clippingsPage: clippings.pageInfo || {},
      menus: menus.nodes || [],
      menusRodape: menusRodape?.nodes || [],
      links: links?.nodes || [],
    },
    revalidate: 1,
  };
}
