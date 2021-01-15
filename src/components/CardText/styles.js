import styled from 'styled-components';

export const Card = styled.main`
  cursor: pointer;

  div {
    :last-of-type {
      padding: 15px 10px;
      background-color: rgb(204, 204, 204);
      height: 100px;

      p {
        margin: 0;
        text-align: justify;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }
`;

export const Image = styled.div`
  height: 300px;
  background-size: conver;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #444;
  position: relative;
  ${({ image }) => image && `background-image: url(${image})`};

  h1 {
    font-size: 1.5em;
    background-color: rgba(2, 2, 2, .9);
    color: #fff;
    padding: 5px 10px;
    margin: 0;
    position: absolute;
    width: 100%;
    height: 90px;
    bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    z-index: 3;
    font-family: 'Barlow Condensed';
    font-weight: 600;
  }
`;
