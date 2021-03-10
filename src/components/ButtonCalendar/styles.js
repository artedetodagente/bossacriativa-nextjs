import styled from 'styled-components';

export const Block = styled.div`
  position: relative;
`;

export const Button = styled.button`
  padding: 10px;
  border-radius: 30px;
  border: 1px solid #222;
  background-color: ${({ theme }) => theme.colors.default.primary};
  cursor: pointer;
`;

export const Modal = styled.div`
  position: absolute;
  margin: 10px 0;
  overflow: hidden;
  height: auto;
  width: auto;
  display: flex;
  height: 330px;
  width: 350px;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: visibility .3s, opacity .3s linear;
  z-index: 998;

  :hover {
    visibility: visible;
    opacity: 1;
  }
`;
