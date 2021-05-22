import styled from 'styled-components';

export const Container = styled.footer`
  display: flex;
  flex-direction: column;

  > div {
    padding: 10px 5px;
    flex: 1;
    background-color: rgb(26, 26, 26);

    h4 {
      color: #fff;
      text-transform: uppercase;
      margin: 0;
    }
  
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      list-style: none;
      margin: 0;
      padding: 0;
      padding-top: 1em;

      li {
        div{
          position: relative;
          width: 30vw;
          height: 12vw;
        }
      }
  
      
    }
      
    
  }

  @media ${({ theme }) => theme.devices.laptop} {
    >  div {
      padding: 10px 4em;
      ul{
        padding-top: 0;
        li {
          div{
            position: relative;
            width: 12vw;
            height: 5vw;
          }
        }
      }

    }
  }

`;
