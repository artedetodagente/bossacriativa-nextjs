import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import Page from '@/components/Page';
import styles from '@/styles/Home.module.css';
import { getPosts, getSinglePost } from '@/services/api';
import Breadcrumb from '@/components/Breadcrumb';

export default function Home({ post }) {
  return (
    <Page>
      <Breadcrumb
        links={[{ link: '/mostras', title: 'Mostra Virtual' }]}
      />
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
  const data = await getSinglePost(params.slug);
  return {
    props: {
      post: data.nodes[0],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const data = await getPosts();
  return {
    paths: data.nodes.map((node) => `/noticias/${node.slug}`) || [],
    fallback: true,
  };
}
