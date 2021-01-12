import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import Page from '@/components/Page';
import styles from '@/styles/Home.module.css';
import YouEmbed from '@/components/YouEmbed';
import DisqusComments from '@/components/DisqusComments';
import core from '@/core';

export default function LiveSlug({ live }) {
  return (
    <Page>
      <div className={styles.container}>
        <h3>
          <Link href="/">Bossa Criativa</Link>
        </h3>
        <h1>{`Video ${live?.title}`}</h1>
        <YouEmbed url={live?.acf_data?.videoUrl} />
        <div className="content">
          {parse(live?.excerpt || '')}
        </div>
        <DisqusComments post={{ ...live, path: `${process.env.NEXT_PUBLIC_URL}lives/${live?.slug}` }} />
      </div>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const data = await core.lives.getOne(params.slug);
  return {
    props: {
      live: data.nodes[0],
    },
    revalidate: process.env.REQUEST_TIME,
  };
}

export async function getStaticPaths() {
  const data = await core.lives.getAll();
  return {
    paths: data.nodes.map((node) => `/lives/${node.slug}`) || [],
    fallback: true,
  };
}
