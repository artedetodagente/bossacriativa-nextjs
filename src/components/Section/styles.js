import styled from 'styled-components';

export const Container = styled.section`
  margin: 0;

  main {
    margin-top: 35px;
  }

  @media ${({ theme }) => theme.devices.laptop} {
    margin: 50px 0;
  }
`;
