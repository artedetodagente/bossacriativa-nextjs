/* eslint-disable max-len */
import React from 'react';
import Link from 'next/link';
import { Container } from './styles';

export default function Section({
  title, className, children, link,
}) {
  return (
    <Container className={className}>
      <header>
        <>
          {(link && link.length > 1)
            ? (<Link href={link}><h1 style={{ cursor: 'pointer' }}>{title}</h1></Link>) : <h1>{title}</h1>}
        </>
        <div />
      </header>
      <main>{children}</main>
    </Container>
  );
}
