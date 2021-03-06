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
    border: 2px solid #666;
    background-color: transparent;
    cursor: pointer;

    :first-of-type {
      margin-right: 3px;
    }

    :last-of-type {
      margin-left: 3px;
    }
  }
`;
