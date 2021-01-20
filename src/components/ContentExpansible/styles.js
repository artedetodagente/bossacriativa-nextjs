import styled from 'styled-components';

export const Content = styled.div`
  position: relative;
  z-index: 998;
  width: 100%;

  > div {
    :first-of-type {
      height: 100%;
    }

    :last-of-type {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${({ theme }) => theme.colors.default.primary};
      height: 100px;
      width: 100%;

      button {
        background-color: #000;
        color: #fff;
        border: 0;
        border-radius: 5px;
        padding: 10px 15px;
        font-size: 1em;
        outline: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        
        svg {
          margin-left: 10px;
          font-size: 1.2em;
        }
      }
    }
  }
`;
