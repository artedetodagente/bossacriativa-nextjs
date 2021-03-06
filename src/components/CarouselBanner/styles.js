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



  
  // :hover ${Item} p {
  //   opacity: 1;
  // }

`;

export const Dots = styled.div`
  position: absolute;  
  bottom: 0px;
  display: flex;
  flex-direction: row;
  width: 100%;
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

export const Item = styled.li`
  width: 100%;
  height: 100%;
  background-image: ${({ photo }) => (photo ? `url(${photo})` : 'url("https://img.freepik.com/fotos-gratis/transicao-suave-no-azul-para-o-verde_23-2147734210.jpg?size=626&ext=jpg")')};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .text-container{
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 50px;
    padding: 0 20px;
  }

  h1 {
    font-size: 3em;
    color: #fff;
    margin: 0;
    width: calc(100% - 10px);
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    z-index: 995;
    padding-bottom: 1.5em;
    font-family: ${({ theme }) => theme.fonts.subtitle};
    font-weight: 500;
  }

  p {
    color: #fff;
    width: 100%;
    margin: 0;
    transition: opacity .3s linear;
    z-index: 998;
    font-size: 1.5em;
    height: 2em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media ${({ theme }) => theme.devices.laptop} {
    .text-container{
      display: flex;
      flex-direction: column;
      width: 40%;
    }
  }

`;
