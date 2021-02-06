import React from 'react';
import PropTypes from 'prop-types';
import { RiArrowRightSFill } from 'react-icons/ri';
import { Item } from './styles';

export default function ItemList({ title }) {
  return (
    <Item>
      {title}
      <RiArrowRightSFill />
    </Item>
  );
}

ItemList.propTypes = {
  title: PropTypes.string.isRequired,
};
