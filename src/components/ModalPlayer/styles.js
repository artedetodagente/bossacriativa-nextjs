import styled from 'styled-components';

export const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .8);
  position: fixed;
  z-index: ${({ open }) => (open ? 1000 : -1)};
  top: 0;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: opacity .3s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  flex-direction: column;
  padding: 0 15%;

  header {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    position: relative;

    button {
      color: #fff;
      display: flex;
      position: absolute;
      right: 0;
      top: 25px;
      background-color: transparent;
      font-size: 1.05em;
      border: none;
      cursor: pointer;
      align-items: center;
      outline: none;

      svg {
        margin-left: 10px;
        font-size: 1.3em;
      }
    }
  }

  main {
    /* flex: 1; */
    width: 100%;
    height: 50%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      flex: 1;
    }
  }
`;
