import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import Page from '@/components/Page';
import styles from '@/styles/Home.module.css';
import Breadcrumb from '@/components/Breadcrumb';
import core from '@/core';

export default function NoticeSlug({ post }) {
  return (
    <Page>
      <Breadcrumb />
      <div className={styles.container}>
        <h3><Link href="/">Bossa Criativa</Link></h3>
        <h1>{post?.title}</h1>
        <div className="content">
          {parse(post?.content || '')}
        </div>
      </div>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const data = await core.posts.getOne(params.slug);
  return {
    props: {
      post: data.nodes[0],
    },
    revalidate: process.env.REQUEST_TIME,
  };
}

export async function getStaticPaths() {
  const data = await core.posts.getAll();
  return {
    paths: data.nodes.map((node) => `/noticias/${node.slug}`) || [],
    fallback: true,
  };
}
