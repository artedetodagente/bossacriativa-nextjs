import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ cols }) => cols || 4}, 1fr);
  grid-gap: ${({ gap }) => gap || '20px'};  
  ${({ pt }) => pt >= 0 && `padding-top: ${pt}px`};
  ${({ pb }) => pb >= 0 && `padding-bottom: ${pb}px`};
  ${({ pl }) => pl >= 0 && `padding-left: ${pl}px`};
  ${({ pr }) => pr >= 0 && `padding-right: ${pr}px`};

  h1 {
    font-family: 'Barlow Condensed';
    font-weight: 500;
  }
`;
