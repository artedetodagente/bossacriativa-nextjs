import styled from 'styled-components';

export const Item = styled.button`
  cursor: pointer;
  border: 0;
  border-radius: 150px;
  outline: none;
  padding: ${({ selected }) => (selected ? '10px 30px' : '10px 0px')};
  font-size: 1.1em;
  background-color: ${({ selected }) => (selected ? '#222' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#222')};
  overflow: hidden;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
  margin: 0 5px;
`;
