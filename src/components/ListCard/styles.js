import styled from 'styled-components';

export const Container = styled.article`
  header {
    display: flex;
    margin-bottom: 50px;

    h1 {
      flex: .7;
      font-family: 'Barlow Condensed';
      font-weight: 500;
      margin: 0;
      font-size: 1.7em;
    }

    ul {
      flex: 1;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      list-style: none;
      margin: 0;
      padding: 0;
      overflow-x: auto;
      overflow-y: none;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none; /* Firefox */

      ::-webkit-scrollbar {
        display: none;
      }
      
      li {
        scroll-snap-align: start;
        margin-right: 15px;

        :last-of-type {
          margin-right: 0;
        }
      }
    }
  }
`;

export const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(${({ cols }) => cols || 4}, 1fr);
  grid-gap: ${({ gap }) => gap || '20px'};  
  ${({ pt }) => pt >= 0 && `padding-top: ${pt}px`};
  ${({ pb }) => pb >= 0 && `padding-bottom: ${pb}px`};
  ${({ pl }) => pl >= 0 && `padding-left: ${pl}px`};
  ${({ pr }) => pr >= 0 && `padding-right: ${pr}px`};
`;
