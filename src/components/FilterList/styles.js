import styled from 'styled-components';

export const List = styled.ul`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-x: auto;
  overflow-y: none;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  @media ${({ theme }) => theme.devices.mobile} {
    display: none;
  }

  @media ${({ theme }) => theme.devices.laptop} {
    display: flex;
  }

  ::-webkit-scrollbar {
    display: none;
  }
  
  li {
    scroll-snap-align: start;
    margin-right: 15px;

    :last-of-type {
      margin-right: 0;
    }

    :first-of-type {
      margin-left: 15px;
    }
  }
`;

export const SelectContainer = styled.div`
  width: 100%;
  flex: 1;
  // display: flex;
  position: relative;
  border-radius: 30px;
  background-color: white;
  //margin-bottom: 40px;
  padding-top: 35px;
  

  select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    // border-top-left-radius: 30px;
    // border-bottom-left-radius: 30px;
    padding: 7px;
    background-color: transparent;
    border: none;
    -webkit-appearance: none;
    font-size: 1.1em;
    outline: none;        

    select {
      display: none;
    }

  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    height: 35px;
    border: none;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    background-color: #222;
    color: white;
    width: 43px;
    font-size: 1.1em;
    padding-top: 7px;
    
  }
  
  
  @media ${({ theme }) => theme.devices.laptop} {
    display: none;
  }
`;
