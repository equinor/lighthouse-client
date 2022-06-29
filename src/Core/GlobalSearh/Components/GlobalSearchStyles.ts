import { Search as EdsSearch } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.div<{ hasFocus: boolean }>`
    position: relative;
    width: ${({ hasFocus }) => (hasFocus ? '480px' : '200px')};
    transition: width 0.2s;
`;
export const SearchResult = styled.div`
    position: fixed;
    top: 48px;
    right: 0px;
    width: 690px;
    background: white;
    box-shadow: -5px 5px 10px 0 rgb(0 0 0 / 15%);
    max-height: 90vh;
    overflow-x: hidden;
    overflow-y: auto;
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
    :hover {
        cursor: pointer;
    }
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
