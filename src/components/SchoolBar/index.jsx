import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Bar } from './styles';

export default function SchoolBar({ data }) {
  // const orgs = [
  //   { name: 'UFRJ', url: '/' },
  //   { name: 'Escola de Música da UFRJ', url: '/' },
  //   { name: 'FUJB', url: '/' },
  //   { name: 'FUNARTE', url: '/' },
  //   // { name: 'Cultura', url: '/' },
  //   // { name: 'Turismo', url: '/' },
  //   // { name: 'Governo Federal', url: '/' },
  // ];

  return (
    <Bar>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <li key={item.id}>
            <Link href={item.acf_links_topo?.urlTopo || '/'}>
              <a target="_blank">{item.title}</a>
            </Link>
          </li>
          <li className="separador">|</li>
        </React.Fragment>
      ))}
    </Bar>
  );
}

SchoolBar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape().isRequired),
};

SchoolBar.defaultProps = {
  data: [],
};
