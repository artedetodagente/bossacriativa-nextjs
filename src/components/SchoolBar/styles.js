import styled from 'styled-components';

export const Bar = styled.ul`
  display: flex;
  list-style: none;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 2.5vw 0;
  height: 30px;
  width: 100%;
  background-color: rgb(0, 0, 0);

  li {
    color: #fff;
    text-align: center;
    height: 100%;
    font-size: 2.5vw;
    
    a {
      text-transform: uppercase;
      font-weight: 600;
    }
  }

  li.separador {
    text-align: center;
    width: 1em;
    font-weight: 700;
  }

  li.separador:last-of-type{
    display: none;
  }

  @media ${({ theme }) => theme.devices.mobileL} {
    padding: 5px 0;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    justify-content: flex-end;
    padding: 5px 4em;
    li {
      font-size: 1em;
    }

  }
`;
