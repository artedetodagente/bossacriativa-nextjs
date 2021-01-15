import styled from 'styled-components';

export const Bar = styled.ul`
  display: flex;
  list-style: none;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  padding: 5px 4em;
  height: 30px;
  width: 100%;
  background-color: rgb(0, 0, 0);

  li {
    color: #fff;
    /* padding: 0 10px; */

    :after {
      margin: 0 10px;
      content: '|';
      font-weight: 700;
    }

    :last-of-type:after {
      margin: 0;
      content: '';
    }

    a {
      text-transform: uppercase;
    }
  }
`;
