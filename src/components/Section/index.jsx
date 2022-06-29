/* eslint-disable max-len */
import React from 'react';
import { Container } from './styles';

export default function Section({
  className, children,
}) {
  return (
    <Container className={className}>
      {children}
    </Container>
  );
}
