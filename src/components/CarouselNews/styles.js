import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.default.backgournd};
  margin: 0;
  position: relative;
  
  div.scroll {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    --webkit-overflow-scrolling: touch;
    /* scroll-behavior: smooth; */
    --ms-overflow-style: none;
    scrollbar-width: none;
    height: 100%;
    width: 100%;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Indicator = styled.div`
  position: absolute;
  width: auto;
  height: auto;
  display: flex;
  z-index: 998;
  left: 10px;
  top: 10px;
`;

export const IndicatorItem = styled.button`
  height: 17px;
  width: 17px;
  border-radius: 100%;
  background-color: ${({ selected, theme }) => (selected ? theme.colors.default.primary : 'rgba(255, 255, 255, .5)')};
  margin-right: 5px;
  border: 0;
  outline: none;
  cursor: pointer;

  :last-of-type {
    margin-right: 0;
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
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-areas: 'a1';
`;

export const Item = styled.li`
  width: 100%;
  position: relative;
  cursor: pointer;
  padding-top: calc( 9 / 14 * 100% + 130px);

  article {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 0; 
    height: 100%;
  }

  div.cobertura {
    display: block;
    position: absolute;
    width: 100%;
    left: 0px;
    padding: 0;
    
    top: 0px;
    bottom: auto;
    height: 0px;
    
    z-index:998;

    background: #F7CA18;
    transition-property: all;
    transition-duration: .8s;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transition-delay: 0s;
  }

`;
