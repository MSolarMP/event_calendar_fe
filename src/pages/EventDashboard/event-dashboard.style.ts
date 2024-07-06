import React from 'react';
import styled from 'styled-components';


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr; /* Three columns: 1:1:1 ratio */
  gap: 2rem;
  margin-top: 2rem;
`;

export const Advertisement = styled.div`
  background-color: #f0f0f0;
  padding: 1rem;
  /* Add your advertisement styles */
`;

export const MainContent = styled.div`
  background-color: #ffffff;
  padding: 1rem;
  /* Add your main content styles */
`;