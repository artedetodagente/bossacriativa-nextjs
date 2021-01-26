import styled from 'styled-components';

export const Card = styled.article`
  display: flex;
  background-color: #fff;
  height: 150px;
  /* width: 600px; */

  figure {
    background-color: rgb(51, 51, 51);
    margin: 0;
    width: 180px;

    img {
      height: 100%;
      width: 100%;
    }
  }

  div {
    flex: 1;
    padding: 3px 5px;

    h1 {
      margin: 0;
      background-color: rgb(123, 123, 123);
      padding: 5px;
      color: #fff;
      font-size: 1.1em;
      font-family: 'Barlow Condensed';
    }

    p {
      font-family: 'Barlow Condensed Light';
      margin-top: 10px;
      font-size: 1.1em;
    }
  }
`;
