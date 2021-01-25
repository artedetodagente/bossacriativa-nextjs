import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import styles from '@/styles/Home.module.css';
import Breadcrumb from '@/components/Breadcrumb';
import core from '@/core';
import Page from '@/components/Page';

export default function NoticeSlug({ post, menus }) {
  return (
    <Page menus={menus}>
      <Breadcrumb />
      <div className={styles.container}>
        <h3><Link href="/"><a href="/#">Bossa Criativa</a></Link></h3>
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
  return {
    props: {
      post: nodes[0],
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
