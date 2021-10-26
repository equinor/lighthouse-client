import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Title = styled.h4`
    margin: 0.2rem;
    white-space: nowrap;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    max-width: 300px;
    min-width: 200px;
    height: fit-content;
    word-wrap: break-word;
    max-height: 180px;
    background-color: ${tokens.colors.ui.background__light.rgba};

    label {
        font-size: 1rem;
        padding: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        span {
            padding: 0.1rem;
        }
        svg {
            height: 16px;
            width: 16px;
        }
    }
`;

export const FilterGroupWrapper = styled.div`
    overflow-x: hidden;
    overflow-y: scroll;
`;
export const FilterItemWrapper = styled.div`
    padding-bottom: 1rem;
`;
