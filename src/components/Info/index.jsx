import React from 'react';
import { Container } from './styles';

export default function Info({ title, text, children }) {
  return (
    <Container>
      <h1>{title}</h1>
      <p>{text}</p>
      {children}
    </Container>
  );
}
