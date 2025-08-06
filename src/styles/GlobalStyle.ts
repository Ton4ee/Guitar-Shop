import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f5f5f5;
    color: #333;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
  }

  h1, h3 { margin-bottom: 0.5rem; }
  p { margin-bottom: 0.75rem; }
  button { cursor: pointer; }

  a { text-decoration: none; color: inherit; }
`;
