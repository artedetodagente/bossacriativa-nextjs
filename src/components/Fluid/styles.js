import styled from 'styled-components';

export const Container = styled.div`
  @media ${({ theme }) => theme.devices.mobile} {
    padding: 4em 1em;
  }

  @media ${({ theme }) => theme.devices.mobileL} {
    padding: 4em 1.5em;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 4em 2em;
  }

  @media ${({ theme }) => theme.devices.laptop} {
    padding: 4em;
  }

  @media ${({ theme }) => theme.devices.desktop} {
    padding: 4em 6em;
  }
`;
