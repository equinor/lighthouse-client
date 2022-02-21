import { TopBar } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const Icons = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    > * {
        margin-left: 1rem;
    }
`;

export const TopBarWrapper = styled(TopBar)`
    position: fixed;
    width: 100%;
    z-index: 2;
    height: 48px;
    padding-left: 12px;
    padding-right: 12px;
    > header {
        padding-left: 1.5rem;
    }
`;
