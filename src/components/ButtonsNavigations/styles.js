import styled from 'styled-components';

export const Bar = styled.div`
  display: flex;
  
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 30px;
    width: 90px;
    height: 37.78px;
    border: 2px solid #666;
    background-color: transparent;
    cursor: pointer;
    outline: none;

    :first-of-type {
      margin-right: 3px;
    }

    :last-of-type {
      margin-left: 3px;
    }

    :hover {
      background-color: #666;
      color: white;
    }
  }
`;
