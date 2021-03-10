import styled from 'styled-components';

export const Card = styled.article`
  // min-height: 200px;
  // height: ${({ h }) => (h > 0 ? `${h}px` : '100%')};
  // width: ${({ w }) => (w > 0 ? `${w}px` : '100%')};
  position: relative;
  border-radius: 2px;
  cursor: pointer;
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
      display: flex;
      position: absolute;
      bottom: 20px;
      width: 100%;

      div {
        background-color: rgba(2, 2, 2, .6);
        
        :first-of-type {
          flex: .2;
          margin-right: 5px;
          display: flex;
          align-items: center;
          justify-content: center;

          p {
            font-size: 1.5em;
            color: #fff;
            padding: 5px 10px;
            text-align: center;
            margin: 0;
          }

        }

        :last-of-type {
          flex: 1;
          margin-left: 5px;
          width: 100%;
          
          h1 {
            font-size: 1.5em;
            color: #fff;
            padding: 5px 10px;
            text-align: center;
            margin: 0;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            z-index: 1;
          }
        }
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
