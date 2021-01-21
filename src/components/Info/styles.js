import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.default.primary};
  padding-top: 15px;

  > div:first-of-type {
    @media ${({ theme }) => theme.devices.mobileS} {
      padding: 0 5vw;
    }

    @media ${({ theme }) => theme.devices.laptop} {
      padding: 0 10vw;
    }

    @media ${({ theme }) => theme.devices.desktop} {
      padding: 0 23vw;
    }

    h1 {
      font-size: 3em;
      text-align: center;
      padding-bottom: 15px;
      margin: 0;
    }

    p {
      text-align: justify;
      font-size: 1.2em;
      padding-bottom: 8vh;
    }
  }
`;
