import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 7fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
`;

export const Advertisement = styled.div`
  background-color: #f0f0f0;
  padding: 1rem;
`;