import styled from 'styled-components';

export const Container = styled.footer`
  display: flex;
  flex-direction: column;

  > div {
    padding: 10px 5px;

    :first-of-type {
      flex: 1;
      background-color: rgb(206, 206, 206);
    }

    :last-of-type {
      flex: .2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      background-color: rgb(26, 26, 26);

      div {
        display: inline-block;

        h4 {
          color: #fff;
          text-transform: uppercase;
          margin: 0;
        }
  
        ul {
          display: flex;
          justify-content: flex-end;
          list-style: none;
          margin: 0;
          padding: 0;
  
          li {
            margin-right: 20px;
  
            :last-of-type {
              margin-right: 0;
            }
          }
        }
      }
      
    }
  }

  @media ${({ theme }) => theme.devices.laptop} {
    >  div {
      padding: 10px 4em;
    }
  }
`;
