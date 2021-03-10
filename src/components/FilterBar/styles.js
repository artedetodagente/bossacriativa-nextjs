import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  

  @media ${({ theme }) => theme.devices.laptop} {
    flex-direction: row;
   
  }
`;
