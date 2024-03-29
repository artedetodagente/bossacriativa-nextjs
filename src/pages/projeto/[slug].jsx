import React, { useEffect, useRef } from "react";
import core from "@/core";
import styles from "@/styles/projeto-slug.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import Page from "@/components/Page";
import Fluid from "@/components/Fluid";

export default function ProjectSlug({ project, menus, links, menusRodape }) {
  const content = useRef();

  useEffect(() => {
    const text = project?.acf_data.blocos.reduce((acc, cur) => {
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
    content.current.innerHTML = text;
  }, []);

  return (
    <Page
      menus={menus}
      links={links}
      cssLink="wp_style.css"
      menusRodape={menusRodape}
    >
      <Breadcrumb name={project?.title} />
      <Fluid className={styles.content}>
        <div ref={content} />
      </Fluid>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const project = await core.pages.getOne(params.slug);
  const menus = await core.menus.getAll();
  const menusRodape = await core.menus.getAll("menu_rodape");
  const links = await core.links.getAll();

  return {
    props: {
      project: project || {},
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
    paths: nodes?.map((node) => `/projeto/${node.slug}`) || [],
    fallback: true,
  };
}
