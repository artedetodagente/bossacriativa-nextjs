import React from 'react';
import Page from '@/components/Page';
import Breadcrumb from '@/components/Breadcrumb';
import Descriptor from '@/components/Descriptor';
import core from '@/core';

export default function WorkshopSlug({ workshop }) {
  return (
    <Page>
      <Breadcrumb />
      <Descriptor
        title={workshop.title}
        text={workshop.excerpt}
      />
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const data = await core.oficinas.getOne(params.slug);
  return {
    props: {
      workshop: data.nodes[0] || {},
    },
    revalidate: process.env.REQUEST_TIME,
  };
}

export async function getStaticPaths() {
  const data = await core.oficinas.getAll();
  return {
    paths: data.nodes.map((node) => `/oficinas/${node.slug}`) || [],
    fallback: true,
  };
}
