import styled from 'styled-components';

export const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(${({ cols }) => cols || 4}, 1fr);
  grid-gap: ${({ gap }) => gap || '20px'};
  list-style: ${({ type }) => type || 'none'};
  ${({ pt }) => pt >= 0 && `padding-top: ${pt}px`};
  ${({ pb }) => pb >= 0 && `padding-bottom: ${pb}px`};
  ${({ pl }) => pl >= 0 && `padding-left: ${pl}px`};
  ${({ pr }) => pr >= 0 && `padding-right: ${pr}px`};

  > li {
    ${({ ml }) => ml >= 0 && `margin-left: ${ml}px`};
  }
`;
