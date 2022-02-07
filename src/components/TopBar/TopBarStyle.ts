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

export const BetaTag = styled.div`
    padding: 0 1rem;
    position: absolute;
    left: 40%;
    top: 0px;
    left: 33%;
    display: flex;
    background: #ff7e29;
    color: #fff;
    align-items: center;
    justify-content: space-between;
    width: 30%;
    min-width: 400px;
`;
