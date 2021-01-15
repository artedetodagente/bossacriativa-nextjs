import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.default.primary};
  padding: 10px 10vw 35px 10vw;

  h1 {
    font-size: 3em;
    text-align: center;
  }

  p {
    text-align: justify;
    font-size: 1.2em;
    margin-bottom: 20px;
  }
`;
