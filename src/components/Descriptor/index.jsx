import React from 'react';
import { Container } from './styles';

export default function Descriptor({ title, text, children }) {
  return (
    <Container>
      <h1>{title}</h1>
      <p>{text}</p>
      <div>{children}</div>
    </Container>
  );
}
