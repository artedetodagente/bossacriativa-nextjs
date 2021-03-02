import React from 'react';
import PropTypes from 'prop-types';
import { RiArrowRightSFill } from 'react-icons/ri';
import { Item } from './styles';

export default function ItemList({ title, click }) {
  return (
    <Item onClick={click}>
      {title}
      <RiArrowRightSFill />
    </Item>
  );
}

ItemList.propTypes = {
  title: PropTypes.string.isRequired,
  click: PropTypes.func,
};

ItemList.defaultProps = {
  click: null,
};
