import styled from 'styled-components';

export const WrapperCarousel = styled.div`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;

`;