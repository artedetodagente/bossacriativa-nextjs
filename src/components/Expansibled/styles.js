import styled from 'styled-components';

export const Content = styled.div`
  position: relative;
  z-index: 998;
  width: 100%;

  > div {
    :first-of-type {
      height: ${({ show }) => (show ? '100vh' : 0)};
      background-color: #fff;
      transition: .3s height linear;
      overflow: hidden;
      margin-bottom: 1em;
    }

    :last-of-type {
      display: flex;
      align-items: center;
      justify-content: center;
      // background-color: ${({ theme }) => theme.colors.default.primary};
      // padding: 20px 0;
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
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        
        svg {
          transition: .3s transform linear;
          transform: ${({ show }) => (show ? 'rotate(180deg)' : 'rotate(0deg)')};
          margin-left: 10px;
          font-size: 1.2em;
        }
      }
    }
  }
`;
