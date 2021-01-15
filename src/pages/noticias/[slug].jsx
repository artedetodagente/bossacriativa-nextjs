import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import styles from '@/styles/Home.module.css';
import Breadcrumb from '@/components/Breadcrumb';
import core from '@/core';

export default function NoticeSlug({ post }) {
  return (
    <main>
      <Breadcrumb />
      <div className={styles.container}>
        <h3><Link href="/"><a href="/#">Bossa Criativa</a></Link></h3>
        <h1>{post?.title}</h1>
        <div className="content">
          {parse(post?.content || '')}
        </div>
      </div>
    </main>
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
