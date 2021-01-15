import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Container } from './styles';

export default function Footer() {
  const sponsors = [];

  return (
    <Container>
      <div />
      <div>
        <div>
          <h4>Realização</h4>
          <ul>
            {
              sponsors.map((item, index) => (
                <li key={index}>
                  <Link href={item.url}>
                    <a href="/#">
                      <Image
                        src={item.image}
                        width="100px"
                        height="80px"
                      />
                    </a>
                  </Link>
                </li>
              ))
            }
            <li />
          </ul>
        </div>
      </div>
    </Container>
  );
}
