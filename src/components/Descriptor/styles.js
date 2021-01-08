import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.default.primary};
  padding: 10px 20px;

  h1 {
    text-align: center;
  }

  p {
    text-align: justify;
  }

`;
