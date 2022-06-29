import styled from 'styled-components';

export const Wrapper = styled.div`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width};
  position: relative;

  div.scroll {
    width: 100%;
    height: 100%;
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    margin: 0;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    ::-webkit-scrollbar {
      display: none;
    }
  }

`;

export const Dots = styled.div`
  position: absolute;
  z-index: 998;
  right: 10px;
  display: flex;
  flex-direction: row;
  width: auto;
  justify-content: center;
  button{
    height: 16px;
    width: 16px;
    border-radius: 10px;
    margin: 15px 5px;
    cursor: pointer;
    border-style: none;
  }
`;

export const Slide = styled.ul`
  flex: none;
  scroll-snap-align: start;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
`;

export const Card = styled.li`
  width: 100%;
  min-height: 200px;
  height: 100%;
  display: flex;
  align-items: flex-end;
  background-image: ${({ image }) => (image ? `url(${image})` : '')};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  border-radius: 2px;
  cursor: pointer;

  div.header {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }

  h1 {
    font-size: 1.5em;
    background-color: rgba(2, 2, 2, .6);
    color: #fff;
    padding: 5px 10px;
    text-align: start;
    margin-bottom: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    z-index: 1;
  }

  h1.date {
    width:10%;
  }

  h1.title {
    width: 89%;
    padding-left: 20px;
  }

  div.excerpt {
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    padding: 10px;
    transition: opacity .3s linear;
    opacity: 0;
    background-color: rgba(2, 2, 2, .8);
    z-index: 997;
    overflow: hidden;
  }

  :hover > div {
    opacity: 1;
    overflow: hidden;
  }

  p {
    color: #fff;
    margin-top: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
`;
