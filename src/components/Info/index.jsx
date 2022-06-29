import React from 'react';
import { Container } from './styles';

export default function Info({ title, text, children }) {
  return (
    <Container>
      <div>
        {title && <h1>{title}</h1>}
        {text && <p>{text}</p>}
      </div>
      {children}
    </Container>
  );
}
