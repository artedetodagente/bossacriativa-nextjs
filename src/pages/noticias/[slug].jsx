import React from "react";
import Link from "next/link";
import parse from "html-react-parser";
import style from "@/styles/noticias.module.css";
import core from "@/core";
import Breadcrumb from "@/components/Breadcrumb";
import Page from "@/components/Page";

export default function NoticeSlug({ post, menus, links, menusRodape }) {
  return (
    <Page
      menus={menus}
      links={links}
      cssLink="wp_style.css"
      menusRodape={menusRodape}
    >
      <Breadcrumb name={post?.title} />
      <div className={style.container}>
        <h3>
          <Link href="/">
            <a>Bossa Criativa</a>
          </Link>
        </h3>
        <h1>{post?.title}</h1>
        <div className="content">{parse(post?.content || "")}</div>
      </div>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const { nodes } = await core.posts.getOne(params.slug);
  const menus = await core.menus.getAll();
  const menusRodape = await core.menus.getAll("menu_rodape");
  const links = await core.links.getAll();

  return {
    props: {
      post: nodes[0],
      menus: menus.nodes || [],
      menusRodape: menusRodape?.nodes || [],
      links: links?.nodes || [],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { nodes } = await core.posts.getAll();
  return {
    paths: nodes.map((node) => `/noticias/${node.slug}`) || [],
    fallback: true,
  };
}
