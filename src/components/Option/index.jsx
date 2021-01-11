import React from 'react';
import PropTypes from 'prop-types';
import { Item } from './styles';

export default function Option({
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

Option.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  click: PropTypes.string.isRequired,
};

Option.defaultProps = {
  selected: false,
};
