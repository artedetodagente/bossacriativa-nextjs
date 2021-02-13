import React, { useEffect, useRef } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import core from '@/core';
import Page from '@/components/Page';
import Fluid from '@/components/Fluid';

export default function Project({ project, menus }) {
  const content = useRef();

  useEffect(() => {
    content.current.innerHTML = project[0].acf_data.blocos[0].texto;
  }, []);

  return (
    <Page menus={menus}>
      <Breadcrumb />
      <Fluid>
        <div ref={content} />
      </Fluid>
    </Page>
  );
}

export async function getStaticProps() {
  const project = await core.pages.getProject();
  const menus = await core.menus.getAll();

  return {
    props: {
      project: project.nodes || [],
      menus: menus.nodes || [],
    },
    revalidate: 1,
  };
}
