import styled from 'styled-components';

export const Card = styled.article`
  display: flex;
  background-color: #fff;

  figure {
    flex: .4;
    margin: 0;
    font-size: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(51, 51, 51);
    color: #fff;
  }

  p {
    flex: 1;
    padding: 10px 15px;
  }
`;
