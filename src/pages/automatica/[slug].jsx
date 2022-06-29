import React, { useEffect, useRef } from "react";
import core from "@/core";
import styles from "@/styles/automatica-slug.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import Page from "@/components/Page";
import Fluid from "@/components/Fluid";

export default function GenericaSlug({
  automatica,
  menus,
  links,
  menusRodape,
}) {
  const content = useRef();

  useEffect(() => {
    const text = automatica?.acf_data.blocos.reduce((acc, cur) => {
      if (cur.fieldGroupName === "page_AcfData_Blocos_EditorDeTexto") {
        return acc + cur.texto;
      }
      if (cur.fieldGroupName === "page_AcfData_Blocos_ImagemFull") {
        return `${acc}<img src="${cur.imagem.mediaItemUrl}" alt="${cur.imagem.altText}" />`;
      }
      if (cur.fieldGroupName === "page_AcfData_Blocos_Galeria") {
        return `${acc}<img src="${cur.imagem.mediaItemUrl}" alt="${cur.imagem.altText}" />`;
      }
      return "";
    }, "");

    if (text) {
      content.current.innerHTML = text;
    } else {
      content.current.innerHTML = automatica?.content;
    }
  }, []);

  return (
    <Page
      menus={menus}
      links={links}
      cssLink={["wp_style.css", "gutenberg-style.css", "gutenberg-theme.css"]}
      menusRodape={menusRodape}
    >
      <Breadcrumb name={automatica?.title} />
      <Fluid className={styles.content}>
        <div ref={content} />
      </Fluid>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const automatica = await core.pages.getOne(params.slug);
  const menus = await core.menus.getAll();
  const menusRodape = await core.menus.getAll("menu_rodape");
  const links = await core.links.getAll();

  return {
    props: {
      automatica: automatica || {},
      menus: menus?.nodes || [],
      menusRodape: menusRodape?.nodes || [],
      links: links?.nodes || [],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { nodes } = await core.pages.getAll();
  return {
    paths: nodes?.map((node) => `/automatica/${node.slug}`) || [],
    fallback: true,
  };
}
