import styled from 'styled-components';

export const Item = styled.button`
  border: 0;
  outline: none;
  padding: 5px 10px;
  font-size: 1.1em;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#222' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#222')};
  overflow: hidden;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
`;
