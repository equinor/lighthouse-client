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
    width: 500px;
    background: white;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    max-height: 90vh;
    overflow-y: auto;
`;

export const Search = styled(EdsSearch)`
    background: ${tokens.colors.ui.background__default.rgba};

    :focus-within {
        background: ${tokens.colors.ui.background__light.rgba};
    }
`;
