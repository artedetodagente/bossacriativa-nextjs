import React from 'react';
import { Container } from './styles';

export default function Fluid({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
}
