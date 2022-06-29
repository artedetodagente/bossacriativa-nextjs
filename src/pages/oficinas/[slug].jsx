import React, { useEffect, useRef, useState } from "react";
import core from "@/core";
import styles from "@/styles/oficinas-slug.module.css";
import { getISODateString } from "@/utils/date";
import theme from "@/theme";
import Section from "@/components/Section";
import Breadcrumb from "@/components/Breadcrumb";
import Info from "@/components/Info";
import Fluid from "@/components/Fluid";
import YouEmbed from "@/components/YouEmbed";
import FlatList from "@/components/FlatList";
import CardImageWithTitle from "@/components/CardImageWithTitle";
import Option from "@/components/Filter";
import Page from "@/components/Page";
import Expansibled from "@/components/Expansibled";
import ItemHeaderList from "@/components/ItemHeaderList";
import ItemList from "@/components/ItemList";
import Title from "@/components/Title";

export default function WorkshopSlug({ workshop, menus, links, menusRodape }) {
  const content = useRef(null);
  const [lesson, setLesson] = useState(0);
  const [title, setTitle] = useState("Conteúdo Programático");
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState("todos");

  useEffect(() => {
    const authors = workshop?.oficinas.nodes
      .filter((item) => item.acf_data.autor !== null)
      .reduce((acc, cur) => [...acc, cur.acf_data.autor], [])
      .filter(
        (item, i, arr) =>
          arr.slice(0, i).findIndex((it) => it.title === item.title) === -1
      );
    setTeachers(authors ? [{ title: "Todos", slug: "todos" }, ...authors] : []);
    content.current.innerHTML = workshop.acf_data?.descricaoCompleta;
  }, []);

  async function changeLeasson(id) {
    const index = workshop?.oficinas.nodes.findIndex((item) => item.id === id);
    const margemSeguranca = 50;
    let dist;
    if (window.innerWidth > theme.sizes.laptop) {
      dist =
        document.querySelector(".cabecalho").scrollHeight +
        document.querySelector(`.${styles.expansibleContainer}`).scrollHeight -
        margemSeguranca;
    } else {
      dist = document.querySelector(".cabecalho").scrollHeight;
    }
    document.body.scrollTop = dist;
    document.documentElement.scrollTop = dist;
    setLesson(index);
  }

  function changeContent(info) {
    setTitle(info.title);
    content.current.innerHTML = info.content;
  }

  return (
    <Page menus={menus} links={links} menusRodape={menusRodape}>
      <div className="cabecalho">
        <Breadcrumb name={workshop?.name} />
        <Info
          title={workshop?.name}
          // text={workshop?.description}
        />
      </div>
      <Fluid className={styles.layout}>
        <div className={styles.player}>
          <YouEmbed url={workshop?.oficinas.nodes[lesson]?.acf_data.videoUrl} />
        </div>
        <div className={styles.expansibleContainer}>
          <Expansibled
            showText="Sobre essa oficina, professores e conteúdo programático"
            hiddenText="Fechar"
          >
            <Fluid className={styles.expansibledLayout}>
              <ul>
                <ItemHeaderList
                  title="Conteúdo Programático"
                  click={() =>
                    changeContent({
                      title: "Conteúdo Programático",
                      content: workshop.acf_data?.descricaoCompleta,
                    })
                  }
                />
                <ItemHeaderList title="Professores" />
                {teachers.map(
                  (item, index) =>
                    item.title !== "Todos" && (
                      <ItemList
                        key={index}
                        title={item.title}
                        click={() => changeContent(item)}
                      />
                    )
                )}
              </ul>
              <div>
                <h1>{title}</h1>
                <div ref={content} />
              </div>
            </Fluid>
          </Expansibled>
        </div>
        <Section title="Próximas Aulas" className={styles.listContainer}>
          <header>
            <Title>Próximas Aulas</Title>
          </header>
          <main>
            <FlatList
              className={styles.list}
              source={
                workshop?.oficinas.nodes.slice(lesson + 1, lesson + 3) || []
              }
              colsxss={2}
              cols={2}
              renderItem={(item) => (
                <CardImageWithTitle
                  video={item.acf_data?.videoUrl}
                  image={item.featuredImage?.node.mediaItemUrl}
                  title={item.title}
                  excerpt={item.excerpt}
                  click={() => changeLeasson(item.id)}
                />
              )}
            />
          </main>
        </Section>
        <Section className={styles.videosContainer}>
          <header>
            <Title>Todas as Aulas</Title>
          </header>
          <main>
            <FlatList
              className={styles.videos}
              source={
                teacher !== "todos"
                  ? workshop?.oficinas.nodes.filter(
                      (item) =>
                        item.acf_data.autor &&
                        item.acf_data.autor.slug !== teacher
                    )
                  : workshop?.oficinas.nodes || []
              }
              colsxss={1}
              colsmd={2}
              cols={3}
              colsl={4}
              colsxl={8}
              filters={teachers}
              renderItem={(item) => (
                <CardImageWithTitle
                  video={item.acf_data?.videoUrl}
                  image={item.featuredImage?.node.mediaItemUrl}
                  title={item.title}
                  excerpt={item.excerpt}
                  click={() => changeLeasson(item.id)}
                />
              )}
              renderFilter={(item) => (
                <Option
                  id={item.slug}
                  name={item.title}
                  selected={teacher === item.slug}
                  click={() => setTeacher(item.slug)}
                />
              )}
            />
          </main>
        </Section>
      </Fluid>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const { nodes } = await core.oficinas.getOne(params.slug);
  const menus = await core.menus.getAll();
  const menusRodape = await core.menus.getAll("menu_rodape");
  const links = await core.links.getAll();

  nodes[0]?.oficinas.nodes.sort(
    (a, b) =>
      new Date(getISODateString(a.acf_data.dataDePublicacao)) -
      new Date(getISODateString(b.acf_data.dataDePublicacao))
  );

  return {
    props: {
      menus: menus?.nodes || [],
      menusRodape: menusRodape?.nodes || [],
      links: links?.nodes || [],
      workshop: nodes[0] || {},
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { nodes } = await core.oficinas.getAll();
  return {
    paths: nodes.map((node) => `/oficinas/${node.slug}`) || [],
    fallback: true,
  };
}
