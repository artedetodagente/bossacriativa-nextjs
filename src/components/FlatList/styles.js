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
      justify-content: flex-end;
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
  grid-gap: ${({ gap }) => gap || '20px'};
  ${({ pt }) => pt >= 0 && `padding-top: ${pt}px`};
  ${({ pb }) => pb >= 0 && `padding-bottom: ${pb}px`};
  ${({ pl }) => pl >= 0 && `padding-left: ${pl}px`};
  ${({ pr }) => pr >= 0 && `padding-right: ${pr}px`};

  @media ${({ theme }) => theme.devices.mobileS} {
    grid-template-columns: repeat(${({ colsxss }) => colsxss}, 1fr);
  }

  @media ${({ theme }) => theme.devices.mobileM} {
    grid-template-columns: repeat(${({ colsxsm }) => colsxsm}, 1fr);
  }

  @media ${({ theme }) => theme.devices.mobileL} {
    grid-template-columns: repeat(${({ colsxsl }) => colsxsl}, 1fr);
  }

  @media ${({ theme }) => theme.devices.tablet} {
    grid-template-columns: repeat(${({ colsmd }) => colsmd}, 1fr);
  }

  @media ${({ theme }) => theme.devices.laptop} {
    grid-template-columns: repeat(${({ cols }) => cols}, 1fr);
  }

  @media ${({ theme }) => theme.devices.laptopL} {
    grid-template-columns: repeat(${({ colsl }) => colsl}, 1fr);
  }

  @media ${({ theme }) => theme.devices.desktop} {
    grid-template-columns: repeat(${({ colsxl }) => colsxl}, 1fr);
  }
`;
