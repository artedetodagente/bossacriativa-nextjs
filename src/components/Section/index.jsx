import React from 'react';
import { Container } from './styles';

export default function Section({ title, className, children }) {
  return (
    <Container className={className}>
      <div>
        <h1>{title}</h1>
        <div />
      </div>
      <div>{children}</div>
    </Container>
  );
}
