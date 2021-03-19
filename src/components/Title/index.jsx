import Link from 'next/link';
import React from 'react';
import { Text } from './styles';

export default function Title({ link, children }) {
  return (
    <Text>
      <>
        {
        (link && link.length > 1) ? (
          <Link href={link}>
            <h1 style={{ cursor: 'pointer' }}>{children}</h1>
          </Link>
        ) : <h1>{children}</h1>
      }
      </>
      <div />
    </Text>
  );
}
