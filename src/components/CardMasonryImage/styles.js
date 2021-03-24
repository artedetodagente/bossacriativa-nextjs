import styled from 'styled-components';

export const Card = styled.article`
  position: relative;
  display: flex;

  figure {
    margin: 0;
    padding: 0;
  }

  h1 {
    position: absolute;
    bottom: 0px;
    margin: 0;
    color: #fff;
    padding: 10px 5px;
    background-color: rgba(0, 0, 0, .5);
    width: 100%;
    text-align: center;
  }

  :hover {
    div {
      opacity: 1;
    }
  }

  div {
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, .7);
    color: #fff;
    padding: 10px;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: opacity .3s linear;

    p {
      margin: 0;
    }
  }
`;
