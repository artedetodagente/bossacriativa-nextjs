import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.default.primary};
  border-radius: 15px;
  border-top-left-radius: 2px;
  padding: 30px 15px;
  width: 350px;

  > div {
    :first-of-type {
      display: flex;
      align-items: center;

      button {
        :first-of-type {
          margin-right: 5px;
        }
        :last-of-type {
          margin-left: 5px;
        }
      }

      div:last-of-type {
        display: flex;
        align-items: flex-end;

        h1 {
          margin: 0;
          margin-left: 10px;
          margin-right: 5px;
          font-size: 1.5em;
        }
      }
    }
  }

`;
