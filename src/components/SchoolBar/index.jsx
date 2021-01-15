import Link from 'next/link';
import React from 'react';
import { Bar } from './styles';

export default function SchoolBar() {
  const orgs = [
    { name: 'UFRJ', url: '/' },
    { name: 'Escola de Música da UFRJ', url: '/' },
    { name: 'FUJB', url: '/' },
    { name: 'FUNARTE', url: '/' },
    { name: 'Cultura', url: '/' },
    { name: 'Turismo', url: '/' },
    { name: 'Governo Federal', url: '/' },
  ];

  return (
    <Bar>
      {
        orgs.map((item, index) => (
          <li key={index}>
            <Link href={item.url}>
              <a href="/#">
                {item.name}
              </a>
            </Link>
          </li>
        ))
      }
    </Bar>
  );
}
