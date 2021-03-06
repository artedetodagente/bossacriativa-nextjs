import styled from 'styled-components';

export const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  > div {
    display: flex;
    padding-right: 5%;

    button {
      border: 0;
      border-top-left-radius: 100%;
      border-bottom-left-radius: 100%;
      outline: none;
      height: 35px;
      width: 43px;
      font-size: 1.1em;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background-color: ${({ theme }) => theme.colors.default.btnsearch};
      cursor: pointer;
    }
    
    input {
      height: 35px;
      font-size: 1.1em;
      padding: 0 5px;
      border: 0;
      outline: none;
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;

      ::placeholder {
        color: rgb(209, 205, 205);
      }
    }
  }
`;
