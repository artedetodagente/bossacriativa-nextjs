import styled from 'styled-components';

export const Card = styled.article`
  position: relative;
  display: flex;
  cursor: ${({ isClick }) => (isClick ? 'pointer' : 'auto')};

  figure {
    margin: 0;
    padding: 0;

    img {
      height: 100%;
      width: 100%;
    }
  }

  div.icon {
    position: absolute;
    padding: 15px;
    right: 0;
    display: ${({ isCollection }) => (isCollection ? 'block' : 'none')};

    * {
      color: #ddd;
      font-size: 1.5em;
    }
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

  div:last-of-type {
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

  :hover {
    div:last-of-type {
      opacity: 1;
    }
  }
`;
