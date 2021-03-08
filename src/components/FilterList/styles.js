import styled from 'styled-components';

export const List = styled.ul`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-x: auto;
  overflow-y: none;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  @media ${({ theme }) => theme.devices.mobile} {
    display: none;
  }

  @media ${({ theme }) => theme.devices.laptop} {
    display: flex;
  }

  ::-webkit-scrollbar {
    display: none;
  }
  
  li {
    scroll-snap-align: start;
    margin-right: 15px;

    :last-of-type {
      margin-right: 0;
    }
  }
`;

export const Select = styled.select`
  width: 100%;
  flex: 1;
  font-size: 1.3em;

  @media ${({ theme }) => theme.devices.laptop} {
    display: none;
  }
`;
