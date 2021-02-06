import React from 'react';
import PropTypes from 'prop-types';
import { Item } from './styles';

export default function ItemHeaderList({ title }) {
  return (
    <Item>{title}</Item>
  );
}

ItemHeaderList.propTypes = {
  title: PropTypes.string.isRequired,
};
