import { tokens } from '@equinor/eds-tokens';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        font-family: Equinor;
        font-size: 13px;
        margin: 0;
    };

    p {
        font-family: Equinor;
        font-size: 13px !important;
    }
    button {
        font-family: Equinor;
    }
    pre {
        font-family: Equinor;
        font-size: 13px !important;
        font-weight: 400;
        line-height: 1.250em;
        text-align: left;
    }

    ::-webkit-scrollbar {
        height: 0.5rem;
        width: 0.5rem;
    }

        /* Track */
        ::-webkit-scrollbar-track {
        background: none; 
        }
        
        /* Handle */
        ::-webkit-scrollbar-thumb {
        background: ${tokens.colors.interactive.primary__resting.rgba}; 
        border-radius: 5px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
        background:${tokens.colors.interactive.primary__hover.rgba}; 
        }
`;
