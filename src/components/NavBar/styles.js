import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  right: 0px;
  background-color: #fff;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  overflow: none;
  height: calc(110px - 10px);
  padding: 0 40px;

  .hamburguer{
    display: inline-block;
    font-size: 3em;
    position: absolute;
    right: 0;
    padding: .35em .5em;

    span{
      background-color: #000;
      color: #fff;
      font-weight: 400;
      margin-left: .2em;
    }
    
  }

  > div {
    width: 100%;
    justify-content: space-between;
  }

  > ul {
    transition: transform 0.3s ease-in-out;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    background-color: #fff;
    flex-direction: column;
    justify-content: right;
    max-height: 80vh;
    text-align: right;
    padding-right: 2rem;
    position: absolute;
    top: calc(100%);
    margin-top: 0;
    right: 0;
    list-style: none;
    font-size: 1.5em;
    overflow-y: scroll;


    > li.circulo {
      display: none;
    }
    > li {
        margin-top: 10px;
      > ul {
        font-size: .8em;
        list-style: none;
        line-height: 1.5em;
        a {
          font-family: 'Barlow Condensed Light';
        }
        
      } 
    }
  }
  
  @media ${({ theme }) => theme.devices.laptop} {
    .hamburguer{
      display: none;
    }

    div {
      flex: .15;
      margin: 0;
    }

    > ul {
      text-align: left;
      position: relative;
      flex: 1;
      font-size: 1em;
      display: flex;
      transform: none;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      margin: 0;
      padding: 0;
      overflow: visible;   
      top: auto;  

      > li.circulo {
        display: inline;
        position: relative;
        font-size: .5em;
        bottom: 1px;
      }

      > li {
        position: relative;
        color: #000;
        margin: 0 15px;

        :hover {
          ul {
            display: grid;
          }
        }

        :nth-of-type(odd) {
          margin: 0;
        }

        :last-of-type {
          margin-right: 0;
          display: none;
        }

      ul {
        position: absolute;
        flex-direction: column;
        justify-content: left;
        width: calc(250px - 30px);
        left: calc(50% - 220px/2);
        padding: 15px;
        grid-template-columns: repeat(1, 1fr);
        z-index: 1000;
        background-color: rgb(230, 230, 230);
        display: none;
        list-style: circle;
        font-size: 1em;

        li {
          display: flex;
          margin: 0;
          
        

          a {
            flex: 1;
            padding: 0 5px;
            font-size: 1.2em;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-family: 'Barlow Condensed Light';

            :hover {
              background-color: ${({ theme }) => theme.colors.default.primary};
            }
          }
        }
      }
      a { font-size: 1.5em;}
    }
      
  }
    
  }  
  
`;
