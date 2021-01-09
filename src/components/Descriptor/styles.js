import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.default.primary};
  padding: 10px 60px 35px 60px;

  h1 {
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: 3em;
    text-align: center;
  }

  p {
    text-align: justify;
  }

`;
