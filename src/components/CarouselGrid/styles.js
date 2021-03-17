import styled from 'styled-components';

export const Wrapper = styled.div`
  /*height: ${({ h }) => h}px;*/
  width: 100%;
  background-color: ${({ theme }) => theme.colors.default.background};
  margin: 0;
  position: relative;

  div.scroll {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
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

export const Indicator = styled.div`
  position: absolute;
  width: auto;
  height: auto;
  display: flex;
  /*bottom: 10px;*/
  z-index: 998;
  ${({ reverse }) => (reverse ? 'right: 10px; bottom: 10px' : 'left: 10px; top: 10px')};
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
  display: ${({ mobile }) => (mobile ? 'none' : 'block')};

  :last-of-type {
    margin-right: 0;
  }

  @media ${({ theme }) => theme.devices.mobileS} {
    display: ${({ mobile }) => (mobile ? 'block' : 'none')};
  }

  @media ${({ theme }) => theme.devices.laptop} {
    display: ${({ mobile }) => (mobile ? 'none' : 'block')};
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

  @media ${({ theme }) => theme.devices.mobileS} {
    display: ${({ mobile }) => (mobile ? 'grid' : 'none')};
    grid-template-columns: repeat(1, 1fr);
    grid-template-areas: 'a1';
  }

  @media ${({ theme }) => theme.devices.laptop} {
    display: ${({ mobile }) => (mobile ? 'none' : 'grid')};
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas: ${({ reverse }) => (!reverse
    ? '"a1 a1 a1 a1 a1 a1 a2 a2 a2 a3 a3 a3" "a1 a1 a1 a1 a1 a1 a4 a4 a4 a5 a5 a5"'
    : '"a2 a2 a2 a3 a3 a3 a1 a1 a1 a1 a1 a1" "a4 a4 a4 a5 a5 a5 a1 a1 a1 a1 a1 a1"'
  )};
  }
`;

export const Item = styled.li`
  width: 100%;
  grid-area: ${({ area }) => area || 0};
  position: relative;
  cursor: pointer;
  padding-top: calc( 9 / 14 * 100%);

  article {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 0;
    /* background-image: ${({ photo }) => (photo ? `url(${photo})` : '')}; */
    /* background-repeat: no-repeat; */
    /* background-position: center; */
    /* background-size: land; */
  }

  :first-of-type {
    article {
      height: 100%;
    }
  }

  :first-of-type h1 {
    bottom: 20px;
    width: 50% !important;
  }

  :first-of-type div {
    padding: 20px;
  }

  @media ${({ theme }) => theme.devices.laptop} {
     :first-of-type div {
       padding: 10px;
     }
  }

`;
