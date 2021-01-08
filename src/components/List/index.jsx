import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function List({
  source, identity, renderItem, cols, gap, type, ml, pt, pb, pl, pr,
}) {
  return (
    <Container
      cols={cols}
      gap={gap}
      type={type}
      ml={ml}
      pt={pt}
      pb={pb}
      pl={pl}
      pr={pr}
    >
      { source.map((item) => <li key={item[identity]}>{ renderItem(item) }</li>) }
    </Container>
  );
}

List.propType = {
  souce: PropTypes.arrayOf(PropTypes.any).isRequired,
  key: PropTypes.string,
  renderItem: PropTypes.func.isRequired,
  cols: PropTypes.number,
  gap: PropTypes.string,
  type: PropTypes.string,
  ml: PropTypes.string,
  pt: PropTypes.number,
  pb: PropTypes.number,
  pl: PropTypes.number,
  pr: PropTypes.number,
};

List.defaultProps = {
  identity: 'id',
  cols: 4,
  gap: '20px',
  type: 'none',
  ml: '0px',
  pt: 0,
  pb: 0,
  pl: 0,
  pr: 0,
};
