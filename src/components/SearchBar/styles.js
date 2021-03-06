import styled from 'styled-components';

export const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  > div {
    /* flex: .7; */
    display: flex;
    width: 100%;
    margin: .3em 0;
    
    input {
      width: 100%;
      height: 35px;
      font-size: 1.1em;
      padding: 0 5px;
      border: 0;
      outline: none;

      ::placeholder {
        color: rgb(209, 205, 205);
      }
    }
  }

  ul {
      display: flex;
      list-style: none;
      flex-direction: column;
      margin: 0;
      width: 100%;
      padding: 0;
      height: 3em;
      overflow: visible;
      z-index: 998;
    
    li {
        :not(:first-of-type){
        visibility: ${({ openCombo }) => (openCombo ? 'visible' : 'hidden')};
      }
      
    }
  }

  @media ${({ theme }) => theme.devices.laptop} {
    > div {
      width: auto;
      padding-right: 5%;
      input{
        width: auto;
      }
    }
    flex-direction: row;
    ul{
      flex: 1;
      flex-direction: row;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      list-style: none;
      margin: 0;
      overflow-x: auto;
      overflow-y: none;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none; /* Firefox */
      height: auto;

      ::-webkit-scrollbar {
        display: none;
      }

      li{
        scroll-snap-align: start;
        margin-right: 15px;

        :last-of-type {
          margin-right: 0;
        }

        :not(:first-of-type){
          visibility: visible;
        }
      }
    }
  }
`;

export const BtnSearch = styled.button`
border: 0;
outline: none;
height: 35px;
width: 35px;
font-size: 1.1em;
margin: 0;
display: flex;
align-items: center;
justify-content: center;
color: #fff;
background-color: ${({ theme }) => theme.colors.default.btnsearch};
cursor: pointer;
`;

export const BtnCombo = styled.button`
border: 0;
outline: none;
height: 35px;
width: 35px;
font-size: 1.1em;
margin: 0;
display: flex;
align-items: center;
justify-content: center;
color: #fff;
background-color: ${({ theme }) => theme.colors.default.btnsearch};
cursor: pointer;

@media ${({ theme }) => theme.devices.laptop} {
  display: none;
}
`;