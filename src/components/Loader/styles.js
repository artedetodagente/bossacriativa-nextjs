import styled from 'styled-components';

export const Load = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 1200;
  top: 0;
  background-color: rgba(255, 255, 255, .8);
  display: flex;
  align-items: center;
  overflow: hidden;
  pointer-events: none;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: opacity .3s linear;
`;
