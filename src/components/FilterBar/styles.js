import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  

  @media ${({ theme }) => theme.devices.laptop} {
    flex-direction: row;
    margin-bottom: 20px;
  }
`;
