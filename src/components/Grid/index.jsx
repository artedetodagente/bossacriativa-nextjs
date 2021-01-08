import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Grid({
  source, renderItem, cols, gap, pt, pb, pl, pr,
}) {
  return (
    <Container
      cols={cols}
      gap={gap}
      pt={pt}
      pb={pb}
      pl={pl}
      pr={pr}
    >
      { source.map((item) => renderItem(item)) }
    </Container>
  );
}

Grid.propType = {
  souce: PropTypes.arrayOf(PropTypes.any).isRequired,
  renderItem: PropTypes.func.isRequired,
  cols: PropTypes.number,
  gap: PropTypes.string,
  pt: PropTypes.number,
  pb: PropTypes.number,
  pl: PropTypes.number,
  pr: PropTypes.number,
};

Grid.defaultProps = {
  cols: 4,
  gap: '20px',
  pt: 0,
  pb: 0,
  pl: 0,
  pr: 0,
};
