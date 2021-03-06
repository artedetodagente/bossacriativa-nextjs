import React from 'react';
import PropTypes from 'prop-types';
import { Item } from './styles';

export default function Filter({
  id, name, selected, click,
}) {
  return (
    <Item
      selected={selected}
      onClick={() => click(id)}
    >
      {name}
    </Item>
  );
}

Filter.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  click: PropTypes.func,
};

Filter.defaultProps = {
  selected: false,
  click: null,
};
