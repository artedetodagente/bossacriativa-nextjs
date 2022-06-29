import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.default.primary};
  border-radius: 15px;
  border-top-left-radius: 2px;
  padding: 30px 15px 10px 15px;
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

    :last-of-type {

      div {

        :first-of-type {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          
          margin-top: 25px;

          p{
            text-align: center;
            text-transform: uppercase;
            margin: 0;
          }
        }
      }

      ul {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          /* grid-template-areas:  */
          margin: 0;
          padding: 0;
          margin-top: 15px;
          text-align: center;
          grid-row-gap: 5px;
          list-style: none;
        }

    }
  }
`;

export const Day = styled.button`
  cursor: pointer;
  height: 15px;
  width: 15px;
  border: none;
  background-color: ${({ selected }) => (selected ? '#eee' : 'transparent')};
  padding: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .8em;
  border-radius: 100%;
  margin: auto;
  outline: none;
  color: ${({ mark, selected }) => (mark && !selected ? '#fff' : '#000')};
  
  :hover {
    color: #000;
    background-color: #eee;
  }

  span {
    pointer-events: none;
  }
`;
