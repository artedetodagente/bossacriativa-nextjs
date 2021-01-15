import styled from 'styled-components';

export const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  form {
    flex: 0.3;
    display: flex;
    width: 100%;
    padding-right: 5%;

    button {
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
    }
    
    input {
      flex: 1;
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

    ::-webkit-scrollbar {
      display: none;
    }
    
    li {
      scroll-snap-align: start;
      margin-right: 15px;

      :last-of-type {
        margin-right: 0;
      }
    }
  }
`;
