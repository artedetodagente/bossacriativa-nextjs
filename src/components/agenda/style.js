import styled from 'styled-components';

export const WrapperCarousel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;

`;

export const WrapperAgenda = styled.div`

`;

export const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: 'Barlow Condensed Light';
  font-size: medium;

  button {
    border-radius: 18px;
    height: 35px;
    border: solid 2px #313131;  
    cursor: pointer;
  }

  .months-nav {

    .arrow {
      width: 70px;
  
      :first-of-type {
        margin-right: 5px;
      }
    }
  
    .months {
      margin-left: 10px;
      background-color: #E4BE2B;
    }
  }

  .filter-container {
    display: flex;
    flex-direction: row;

    .filter {
      margin-right: 20px;

      #query {
        height: 30px;
        width: 200px;
        border-radius: 0 15px 15px 0;
        border: none; 
        color: #E4E8E8;
      }
      #search-button {
        height: 30px;
        background-color: #313131;
        border-radius: 15px 0 0 15px;
        border: none;
        width: 40px;
        cursor: pointer;
      }
    }

    .filter-button {
      border: none;
      background-color: rgb(230, 231, 233);
      padding: 0 20px;

      &:hover {
        background-color: #313131;
        color: rgb(230, 231, 233);
      }
    }
  }

`;

