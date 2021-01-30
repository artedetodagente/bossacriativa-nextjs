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
        background-color: #313131 !important;
        color: rgb(230, 231, 233);
      }
    }
  }

.modal-window {
  position: fixed;
  background-color: rgba(255, 255, 255, 0.25);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
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
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
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

  p{
    color: #313131;
  }
}

body{
  background-color: #E4BE2B;
  
  .day-button{
    height: 35px;
    width: 35px;
    background-color: #E4BE2B;
    border: none;
    
    &:hover {
      background-color: rgb(230, 231, 233);
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