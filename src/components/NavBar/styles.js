import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  height: calc(110px - 10px);
  padding: 5px 40px;
  overflow: none;

  div {
    flex: .15;
    margin: 0;
  }

  > ul { 
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;

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
        width: calc(250px - 30px);
        left: calc(50% - 220px/2);
        padding: 15px;
        grid-template-columns: repeat(1, 1fr);
        z-index: 1000;
        background-color: rgb(230, 230, 230);
        display: none;

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

      a {
        font-size: 1.5em;
      }

      svg {
        position: relative;
        bottom: 1px;
        font-size: .5em;
      }
    }
  }
`;
