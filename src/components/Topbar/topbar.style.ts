import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  background-color: #000000; /* Black background */
  padding: 10px;
  display: flex;
  justify-content: space-between; /* Align items in a row with space between */
  align-items: center;
`;

export const Logo = styled.h2`
  margin: 0;
  color: #ffffff; /* White text color */
  margin-left: 30px;
`;

export const Navigation = styled.nav`
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 10px; /* Gap between list items */
    justify-content: flex-end; /* Align items to the right */
    margin-right: 30px;
  }

  li {
    font-size: 1.2rem;
  }

  a {
    text-decoration: none;
    color: #ffffff; /* White text color */
    transition: color 0.3s ease;
  }

  a:hover {
    color: #007bff; /* Hover color */
  }
`;