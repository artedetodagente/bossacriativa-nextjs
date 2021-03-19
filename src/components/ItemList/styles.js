import styled from 'styled-components';

export const Item = styled.li`
  background-color: #ebebeb;
  margin: 0;
  margin-top: 5px;
  padding: 13px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.text};

  svg {
    font-size: 1.5em;
  }
`;
