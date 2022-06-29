import React from 'react';
import { Container } from './styles';

export default function Fluid({ children, className }) {
  return (
    <Container className={className}>
      {children}
    </Container>
  );
}
