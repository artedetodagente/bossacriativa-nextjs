import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import styles from '@/styles/home.module.css';
import YouEmbed from '@/components/YouEmbed';
import DisqusComments from '@/components/DisqusComments';
import core from '@/core';
import Page from '@/components/Page';
import Breadcrumb from '@/components/Breadcrumb';

export default function LiveSlug({
  live, menus, links, menusRodape,
}) {
  return (
    <Page menus={menus} links={links} menusRodape={menusRodape}>
      <Breadcrumb name={live?.title} />
      <div className={styles.container}>
        <h3>
          <Link href="/"><a>Bossa Criativa</a></Link>
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
  const { nodes } = await core.lives.getOne(params.slug);
  const menus = await core.menus.getAll();
  const menusRodape = await core.menus.getAll('menu_rodape');
  const links = await core.links.getAll();

  return {
    props: {
      live: nodes[0] || {},
      menus: menus.nodes || [],
      menusRodape: menusRodape?.nodes || [],
      links: links.nodes || [],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { nodes } = await core.lives.getAll();
  return {
    paths: nodes.map((node) => `/lives/${node.slug}`) || [],
    fallback: true,
  };
}
