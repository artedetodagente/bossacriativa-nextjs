import React from 'react';
import PropTypes from 'prop-types';
import { Item } from './styles';

export default function ItemHeaderList({ title, click }) {
  return (
    <Item onClick={click}>{title}</Item>
  );
}

ItemHeaderList.propTypes = {
  title: PropTypes.string.isRequired,
  click: PropTypes.func,
};

ItemHeaderList.defaultProps = {
  click: null,
};
