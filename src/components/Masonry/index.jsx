import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Masonry({ source, renderItem }) {
  return (
    <Container>
      {
        source.map((item, index) => <div key={index}>{renderItem(item, index)}</div>)
      }
    </Container>
  );
}

Masonry.propTypes = {
  source: PropTypes.arrayOf(PropTypes.shape()),
  renderItem: PropTypes.func,
};

Masonry.defaultProps = {
  source: [],
  renderItem: null,
};
