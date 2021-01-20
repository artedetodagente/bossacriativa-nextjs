import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.default.primary};

  @media ${({ theme }) => theme.devices.mobileS} {
    padding: 15px 5vw;
  }

  @media ${({ theme }) => theme.devices.laptop} {
    padding: 15px 10vw;
  }

  @media ${({ theme }) => theme.devices.desktop} {
    padding: 15px 23vw;
  }

  h1 {
    font-size: 3em;
    text-align: center;
  }

  p {
    text-align: justify;
    font-size: 1.2em;
  }
`;
