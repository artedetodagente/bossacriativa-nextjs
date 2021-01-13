import styled from 'styled-components';

export const Card = styled.div`
  width: 100%;
  height: 200px;
  background-image: ${({ image }) => (image ? `url(${image})` : '')};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  cursor: pointer;

  h1 {
    font-size: 1.5em;
    background-color: rgba(2, 2, 2, .6);
    color: #fff;
    padding: 5px 10px;
    text-align: center;
    margin: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    z-index: 1;
  }

  p {
    background-color: rgba(2, 2, 2, .8);
    color: #fff;
    margin: 0;
    opacity: 0;
    transition: opacity .3s linear;
    height: 100%;
    width: 100%;
    padding: 10px;
    position: absolute;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    z-index: 998;
    left: 0;
  }

  :hover > p {
    opacity: 1;
  }
`;
