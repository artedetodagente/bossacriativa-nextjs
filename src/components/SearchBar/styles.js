import styled from 'styled-components';

export const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  > div {
    display: flex;
    padding-right: 0;
    width: 100%;
    margin: .3em 0;

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
      width: 100%;
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

  @media ${({ theme }) => theme.devices.laptop} {
    flex-direction: row;

    > div {
      width: auto;
      padding-right: 5%;
      input{
        width: auto;
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
