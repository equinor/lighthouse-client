import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
    h1,h2,h3,h4,h5 {
        font-family: 'Oswald', sans-serif;
        padding-bottom: 0.1rem;
    }

    body {
    font-family: 'Roboto', sans-serif;
    }

    :root {
        --ps: 1.5em
    }
`;
