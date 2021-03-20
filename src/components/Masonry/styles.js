import styled from 'styled-components';

export const Container = styled.div`
  column-count: 4;
  column-gap: 1em;

  > div {
    display: inline-block;
    margin: 0 0 1em;
    width: 100%;
  }
`;
