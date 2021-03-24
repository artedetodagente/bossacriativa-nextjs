import styled from 'styled-components';

export const Card = styled.article`
  position: relative;
  border-radius: 2px;
  cursor: ${({ isClick }) => (isClick ? 'pointer' : 'auto')};
  padding-top: calc(9 / 14 * 100%);
  width: 100%;

  figure {
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  img{
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

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

  > a.infoButton {
    position: absolute;
    text-align: left;
    padding: .1em .5em;
    margin: 0;
    right: 0;
    bottom: 60px;
    font-size: 1.5em;
    height: 1.5em;
    width: 2em;
    line-height: 1.5em;
    color: #fff;
    background-color: rgba(2, 2, 2, .6);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    z-index: 998;
  }

  div {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    padding: 10px;
    transition: opacity .3s linear;
    opacity: ${({ infoShow }) => (infoShow ? '1' : '0')};
    background-color: rgba(2, 2, 2, .8);
    z-index: 997;
    overflow: hidden;
  }

  p {
    color: #fff;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }

  @media ${({ theme }) => theme.devices.laptop} {
    :hover > div {
      opacity: 1;
    }

    > a.infoButton {
      display: none;
    }
 }

`;
