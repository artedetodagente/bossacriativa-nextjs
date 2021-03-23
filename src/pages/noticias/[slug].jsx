import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import style from '@/styles/noticias.module.css';
import Breadcrumb from '@/components/Breadcrumb';
import core from '@/core';
import Page from '@/components/Page';

export default function NoticeSlug({ post, menus, links }) {
  return (
    <Page menus={menus} links={links} cssLink="wp_style.css">
      <Breadcrumb />
      <div className={style.container}>
        <h3><Link href="/"><a>Bossa Criativa</a></Link></h3>
        <h1>{post?.title}</h1>
        <div className="content">
          {parse(post?.content || '')}
        </div>
      </div>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const { nodes } = await core.posts.getOne(params.slug);
  const menus = await core.menus.getAll();
  const links = await core.links.getAll();

  return {
    props: {
      post: nodes[0],
      menus: menus.nodes || [],
      links: links.nodes || [],
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
