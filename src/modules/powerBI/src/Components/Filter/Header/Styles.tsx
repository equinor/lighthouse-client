import { Button } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { SEARCH_ID } from './Header';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
    min-height: 36px;
    #${SEARCH_ID} {
        visibility: hidden;
    }
    &:hover #${SEARCH_ID} {
        visibility: visible;
    }
`;

export const Title = styled.div`
    font-weight: 600;
    margin-right: 2rem;
`;

export const SearchButton = styled(Button)`
    width: 36px;
    height: 36px;
`;
