import styled from 'styled-components';

export const Card = styled.main`
  cursor: pointer;

  div {
    :last-of-type {
      padding: 15px 20px;
      background-color: rgb(204, 204, 204);
      height: 150px;

      p {
        margin: 0;
        text-align: justify;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
      }
    }
  }
`;

export const Image = styled.div`
  height: 270px;
  background-size: conver;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #444;
  ${({ image }) => image && `background-image: url(${image})`};
  position: relative;

  h1 {
    font-size: 1.5em;
    background-color: rgba(2, 2, 2, .6);
    color: #fff;
    padding: 5px 10px;
    margin: 0;
    text-align: center;
    position: absolute;
    width: 100%;
    bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    z-index: 3;
    font-family: 'Barlow Condensed';
    font-weight: 500;
  }
`;
