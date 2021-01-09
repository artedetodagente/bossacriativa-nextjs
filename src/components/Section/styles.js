import styled from 'styled-components';

export const Container = styled.section`
  margin: 30px 0;

  > div:first-of-type {
    display: inline-block;
    width: fit-content; 
    margin: 15px 0px;
    position: relative;
    
    h1 {
      margin: 0;
      font-family: ${({ theme }) => theme.fonts.title};
      font-size: 2.7em;
      width: auto;
      z-index: 999;
      padding: 0px 7px;
      position: relative;
      font-weight: 500;
      width: fit-content;
      text-transform: uppercase;
      letter-spacing: -1.5px;
    }

    div {
      background-color: ${({ theme }) => theme.colors.default.primary};
      width: 100%;
      height: 58%;
      position: absolute;
      bottom: 0px;
    }
  }

`;
