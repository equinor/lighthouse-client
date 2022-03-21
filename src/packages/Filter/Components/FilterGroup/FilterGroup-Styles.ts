import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Title = styled.h4`
    margin: 0.2rem;
    white-space: nowrap;
    font-size: 14px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    width: 300px;
    min-width: 200px;
    height: fit-content;
    word-wrap: break-word;
    max-height: 180px;
    /* background-color: ${tokens.colors.ui.background__light.rgba}; */

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
    margin-top: 0.5rem;
    overflow-x: hidden;
    overflow-y: scroll;
`;
export const FilterItemWrapper = styled.div`
    padding-bottom: 1rem;
`;

export const FilterHeaderGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SearchButton = styled(Button)`
    width: 36px;
    height: 36px;
`;
