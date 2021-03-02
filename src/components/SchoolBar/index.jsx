import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Bar } from './styles';

export default function SchoolBar({ data }) {
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
        data.map((item, index) => (
          <li key={index}>
            <Link href={item.acf_links_topo?.urlTopo || '/'}>
              <a>
                {item.title}
              </a>
            </Link>
          </li>
        ))
      }
    </Bar>
  );
}

SchoolBar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape().isRequired),
};

SchoolBar.defaultProps = {
  data: [],
};
