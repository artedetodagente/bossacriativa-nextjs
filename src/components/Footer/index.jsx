import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Container } from './styles';

export default function Footer() {

  const sponsors = [
    { image: require('@/images/footer-ufrj.svg'), url: '/' },
    { image: require('@/images/footer-emufrj.svg'), url: '/' },
    { image: require('@/images/footer-fujb.svg'), url: '/' },
    { image: require('@/images/footer-funarte.svg'), url: '/' },
    // { image: require('@/images/footer-mtur.svg'), url: '/' },
    // { image: require('@/images/footer-secult.svg'), url: '/' },
    // { image: require('@/images/footer-brasil.svg'), url: '/' },
  ];

  return (
    <Container>
      <div>
        <h4>Realização</h4>
        <ul>
          {sponsors.map((item, index) => (
            <li key={index}>
              <Link href={item.url}>
                <a>
                  <div>
                    <Image
                      src={item.image}
                      // width="180px"
                      // height="80px"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </a>
              </Link>
            </li>
          ))}
          {/* <li /> */}
        </ul>
      </div>
    </Container>
  );
}
