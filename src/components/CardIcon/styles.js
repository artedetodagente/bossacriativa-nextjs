import styled from 'styled-components';

export const Card = styled.article`
  display: flex;
  background-color: #fff;
  height: 90px;
  overflow: hidden;

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

  div {
    flex: 1;

    p {
      padding: 0px 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }

`;
