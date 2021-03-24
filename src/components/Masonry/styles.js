import styled from 'styled-components';

export const Container = styled.div`
  column-count: 4;
  column-gap: 1rem;

  > div {
    display: inline-block;
    vertical-align: top;
    margin-bottom: 10px;
    width: 100%;
  }
`;
