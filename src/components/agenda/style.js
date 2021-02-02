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
    outline: none;
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
      border-radius: 18px;
      height: 35px;
      border: solid 2px #313131;  
      cursor: pointer;
      outline: none;
      padding: 6px;
    }
  }

  .filter-container {
    display: flex;
    flex-direction: row;

    .filter {
      margin-right: 20px;
      display: flex;
      flex-direction: row;

      #query {
        height: 30px;
        width: 200px;
        border-radius: 0 15px 15px 0;
        border: none; 
        outline: none;
        ::placeholder {
          color: #E4E8E8;
        }
      }
      #search-button {
        height: 30px;
        background-color: #313131;
        border-radius: 15px 0 0 15px;
        border: none;
        width: 40px;
        cursor: pointer;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .filter-button {
      border: none;
      background-color: rgb(230, 231, 233);
      padding: 0 20px;

      &:hover {
        background-color: #313131 !important;
        color: rgb(230, 231, 233);
      }
    }
  }

.modal-window {
  position: relative;
  top: 5px;
  left: 150px;
  background-color: rgba(255, 255, 255, 0.25);
  z-index: 999;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;

  
  &:target {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
  }
  &>div {
    width: 25vw;
    height: auto;
    padding: 1em;
    background: #E4BE2B;
    border-radius: 3px 15px 15px 15px;
  }

  .arrow-modal{
    background-color: #313131;
    color: rgb(230, 231, 233);
    width: 55px;
    height: 25px;
    margin-right: 5px;
  }
}

header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;

  .month{
    color: #454545;
    font-size: larger;
    margin-left: 5px;
  }
  .year {
    color: #898989;
    font-size: small;
    margin-left: 5px;
    margin-bottom: 7px;
  }
}

body{
  background-color: #E4BE2B;

  .week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    
    .week-day {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #454545;
    }
  }

  .days {
    
    display: grid;
    grid-template-columns: repeat(7, 1fr); 

    .day-1 {
      grid-column-start: ${({ columnStart }) => columnStart};
    }
    
    .day-button{
      height: 35px;
      width: 35px;
      background-color: #E4BE2B;
      border: none;
      margin: auto;
      color: #313131;
      
      &:hover {
        background-color: rgb(230, 231, 233);
      }
    }  
  }
  
}

.modal-close {
  color: #aaa;
  line-height: 50px;
  font-size: 80%;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  text-decoration: none;
  &:hover {
    color: black;
  }
}

`;

export const AgendaFeed = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;

`;