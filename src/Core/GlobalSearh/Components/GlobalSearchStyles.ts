import { Search as EdsSearch } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.div`
    position: relative;
    min-width: 250px;
    width: 30vw;
    max-width: 500px;
`;
export const SearchResult = styled.div`
    position: absolute;
    top: 36px;
    width: auto;
    background: white;
    box-shadow: 0 4px 4px rgb(0 0 0 / 15%);
    max-height: 90vh;
    overflow-y: auto;
    max-width: 600px;
`;

export const NoResult = styled.div`
    padding: 1rem;
    text-align: left;
`;

export const Search = styled(EdsSearch)<{ isSearching: boolean }>`
    background: ${tokens.colors.ui.background__default.rgba};
    padding-left: 6px;
    padding-top: 4px;
    padding-right: 6px;
    padding-bottom: 4px;
    > div {
        display: ${({ isSearching }) => (isSearching ? 'none' : 'flex')};
    }
    > input {
        font-size: 14px;
    }
    :focus-within {
        background: ${tokens.colors.ui.background__light.rgba};
    }
`;
