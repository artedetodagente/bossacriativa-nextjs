import styled from 'styled-components';

export const Item = styled.button`
  color: black;
  width: 100%;
  background-color: #fff;
  height: 35px;
  font-size: 1.1em;
  padding: 0 5px;
  border: 0;
  outline: none;

  @media ${({ theme }) => theme.devices.mobile} { 
    display: none;
  }

  @media ${({ theme }) => theme.devices.laptop} {
    width: 100%;
    height: auto;
    cursor: pointer;
    border: 0;
    border-radius: 150px;
    outline: none;
    padding: ${({ selected }) => (selected ? '10px 30px' : '10px 0px')};
    background-color: ${({ selected }) => (selected ? '#222' : 'transparent')};
    color: ${({ selected }) => (selected ? '#fff' : '#222')};
    overflow: hidden;
    white-space: nowrap;
    display: block;
    text-overflow: ellipsis;
    margin: 0 5px;
    text-transform: capitalize;
  }
`;

export const Option = styled.span`
  @media ${({ theme }) => theme.devices.laptop} {
    display: none;
  }
`;
