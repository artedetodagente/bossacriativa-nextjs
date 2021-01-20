import React from 'react';
import { Container } from './styles';

export default function Section({ title, className, children }) {
  return (
    <Container className={className}>
      <header>
        <h1>{title}</h1>
        <div />
      </header>
      <main>{children}</main>
    </Container>
  );
}
