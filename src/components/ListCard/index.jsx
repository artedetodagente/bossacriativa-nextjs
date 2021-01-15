import React from 'react';
import PropTypes from 'prop-types';
import { Container, Main } from './styles';

export default function ListCard({
  source, filters, renderFilter, renderItem, title, cols, gap, pt, pb, pl, pr, className,
}) {
  return (
    <Container className={className}>
      {
        (title || filters.length > 0) && (
          <header>
            {title && (<h1>{title}</h1>)}
            {
              filters.length > 0 && (
                <ul>
                  {
                    filters.map((item, index) => (
                      <li key={index}>{renderFilter(item)}</li>
                    ))
                  }
                </ul>
              )
            }
          </header>
        )
      }
      <Main
        cols={cols}
        gap={gap}
        pt={pt}
        pb={pb}
        pl={pl}
        pr={pr}
      >
        { source.map((item, index) => (
          <article key={index}>
            {' '}
            { renderItem(item)}
            {' '}
          </article>
        )) }
      </Main>
    </Container>
  );
}

ListCard.propType = {
  source: PropTypes.arrayOf(PropTypes.any).isRequired,
  filters: PropTypes.arrayOf(PropTypes.any),
  renderItem: PropTypes.func.isRequired,
  renderFilter: PropTypes.func,
  title: PropTypes.string,
  cols: PropTypes.number,
  gap: PropTypes.string,
  pt: PropTypes.number,
  pb: PropTypes.number,
  pl: PropTypes.number,
  pr: PropTypes.number,
};

ListCard.defaultProps = {
  title: '',
  filters: [],
  renderFilter: null,
  cols: 4,
  gap: '20px',
  pt: 0,
  pb: 0,
  pl: 0,
  pr: 0,
};
