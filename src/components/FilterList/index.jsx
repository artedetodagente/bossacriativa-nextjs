import React from 'react';
import PropTypes from 'prop-types';
import { List } from './styles';

export default function FilterList({ source, renderItem }) {
  return (
    <List>
      {
        source.map((item, index) => <li key={index}>{renderItem(item)}</li>)
      }
    </List>
  );
}

FilterList.propTypes = {
  source: PropTypes.arrayOf(PropTypes.shape()),
  renderItem: PropTypes.func,
};

FilterList.defaultProps = {
  source: [],
  renderItem: null,
};
