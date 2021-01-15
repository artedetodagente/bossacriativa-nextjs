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

  ul { 
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      position: relative;
      color: #000;

      :hover {
        ul {
          display: grid;
        }
      }

      :nth-of-type(n + 7) ul {
          right: 0;
      }

      ul {
        position: absolute;
        width: calc(350px - 30px);
        padding: 15px;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 15px;
        z-index: 1000;
        background-color: rgb(230, 230, 230);
        display: none;

        li {
          display: flex;

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

      :last-of-type {
        margin-right: 0;

        svg {
          display: none;
        }
      }

      a {
        font-size: 1.5em;
      }

      svg {
        position: relative;
        bottom: 5px;
        margin: 0 15px;
        font-size: .5em;
      }
    }
  }
`;
