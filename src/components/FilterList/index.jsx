import React from 'react';
import PropTypes from 'prop-types';
import { List, Select } from './styles';

export default function FilterList({ source, renderItem }) {
  return (
    <>
      <List>
        {
          source.map((item, index) => <li key={index}>{renderItem(item)}</li>)
        }
      </List>
      <Select>
        {
          source.map((item, index) => <option key={index}>{renderItem(item)}</option>)
        }
      </Select>
    </>
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
