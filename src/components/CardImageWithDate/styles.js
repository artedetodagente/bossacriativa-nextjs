import styled from 'styled-components';

export const Card = styled.article`
  min-height: 200px;
  height: ${({ h }) => (h > 0 ? `${h}px` : '100%')};
  width: ${({ w }) => (w > 0 ? `${w}px` : '100%')};
  position: relative;
  border-radius: 2px;
  cursor: ${({ isClicked }) => (isClicked ? 'pointer' : 'auto')};
  padding-top: calc(9/14 * 100%);
  overflow: hidden;

  figure {
    margin: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  img{
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  > div {

    :first-of-type {
      position: absolute;
      top: 0;
      right: 0;
      width: auto;
      margin-top: 5px;

      p {
        background-color: rgba(2, 2, 2, .6);
        font-size: 1em;
        color: #fff;
        padding: 10px;
        margin: 0;
        margin-right: 5px;
        text-align: left;
        width: fit-content;
        height: fit-content;
      }
    }

    :nth-child(3) {
      display: flex;
      position: absolute;
      bottom: 0px;
      width: 100%;
      /* height: 100%; */
      /* flex-direction: column; */
    
      h1 {
        background-color: rgba(2, 2, 2, .6);
        margin-left: 5px;
        font-size: 1.3em;
        color: #fff;
        padding: 10px;
        width: 100%;
        margin: 0;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        z-index: 1;
      }
    }

    :last-of-type {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      padding: 10px;
      transition: opacity .3s linear;
      opacity: 0;
      background-color: rgba(2, 2, 2, .8);
      z-index: 997;
      overflow: hidden;

      p {
        color: #fff;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
      }
    }
  }

  :hover > div:last-of-type {
    opacity: 1;
    overflow: hidden;
  }
`;
