import styled from 'styled-components';

export const Container = styled.section`
  margin: 0;

  header {
    display: inline-block;
    width: fit-content; 
    margin: 35px 0px;
    position: relative;
    
    h1 {
      margin: 0;
      font-family: ${({ theme }) => theme.fonts.title};
      font-size: 2.7em;
      width: auto;
      z-index: 998;
      padding: 0px 7px;
      position: relative;
      font-weight: 500;
      width: fit-content;
      text-transform: uppercase;
      letter-spacing: -1.5px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    div {
      background-color: ${({ theme }) => theme.colors.default.primary};
      width: 100%;
      height: 58%;
      position: absolute;
      bottom: 0px;
    }
  }

  @media ${({ theme }) => theme.devices.laptop} {
    margin: 50px 0;
  }

`;
