import React from 'react';
import Page from '@/components/Page';
import Breadcrumb from '@/components/Breadcrumb';
import Descriptor from '@/components/Descriptor';

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
