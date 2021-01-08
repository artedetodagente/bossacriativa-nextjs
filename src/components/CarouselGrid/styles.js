import devices from '@/theme/devices';
import styled from 'styled-components';

export const Wrapper = styled.div`
  height: ${({ h }) => h}px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.default.background};
  margin: 20px 0;
  position: relative;

  div.indicators {
    position: absolute;
    width: auto;
    height: auto;
    display: flex;
    top: 10px;
    left: 10px;
    z-index: 999;
  }

  div.scroll {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    height: 100%;
    width: 100%;
    
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Indicator = styled.button`
  height: 17px;
  width: 17px;
  border-radius: 100%;
  background-color: ${({ selected, theme }) => (selected ? theme.colors.default.primary : 'rgba(255, 255, 255, .5)')};
  margin-right: 5px;
  border: 0;
  outline: none;
  cursor: pointer;
  display: ${({ mobile }) => (mobile ? 'none' : 'block')};

  :last-of-type {
    margin-right: 0;
  }

  @media ${devices.tablet} {
    display: ${({ mobile }) => (mobile ? 'block' : 'none')};
  }
`;

export const Slide = styled.ul`
  flex: none;
  scroll-snap-align: start;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  display: ${({ mobile }) => (mobile ? 'none' : 'grid')};
  grid-template-columns: repeat(12, 1fr);
  grid-template-areas: ${({ reverse }) => (!reverse
    ? '"a1 a1 a1 a1 a1 a1 a2 a2 a2 a3 a3 a3" "a1 a1 a1 a1 a1 a1 a4 a4 a4 a5 a5 a5"'
    : '"a2 a2 a2 a3 a3 a3 a1 a1 a1 a1 a1 a1" "a4 a4 a4 a5 a5 a5 a1 a1 a1 a1 a1 a1"'
  )};
  grid-gap: 15px;

  @media ${devices.tablet} {
    display: ${({ mobile }) => (mobile ? 'grid' : 'none')};
    grid-template-columns: repeat(1, 1fr);
    grid-template-areas: 'a1';
  }
`;

export const Item = styled.li`
  width: 100%;
  height: 100%;
  grid-area: ${({ area }) => area || 0};
  background-image: ${({ photo }) => (photo ? `url(${photo})` : '')};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  cursor: pointer;

  h1 {
    font-size: 1.2em;
    background-color: rgba(2, 2, 2, .6);
    color: #fff;
    padding: 10px 5px;
    text-align: center;
    margin: 0;
    position: absolute;
    width: calc(100% - 10px);
    bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    z-index: 1;
  }

  :first-of-type > h1 {
    bottom: 20px;
    width: 50%;
  }

  p {
    background-color: rgba(2, 2, 2, .8);
    color: #fff;
    margin: 0;
    opacity: 0;
    transition: opacity .3s linear;
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    padding: 10px;
    position: absolute;

    z-index: 998;
  }

  :hover > p {
    opacity: 1;
  }
`;
