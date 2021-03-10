import styled from 'styled-components';

export const Container = styled.div`
  @media ${({ theme }) => theme.devices.mobile} {
    padding: 0em 1em;
    padding-top: 10px;
  }

  @media ${({ theme }) => theme.devices.mobileL} {
    padding: 0em 1.5em;
    padding-top: 10px;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 0em 2em;
    padding-top: 10px;
  }

  @media ${({ theme }) => theme.devices.laptop} {
    padding: 3em;
    padding-top: 10px;
  }

  @media ${({ theme }) => theme.devices.desktop} {
    padding: 3em 6em;
    padding-top: 10px;
  }
`;
