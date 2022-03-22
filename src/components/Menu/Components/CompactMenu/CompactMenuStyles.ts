import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const MenuWrapper = styled.div`
    overflow-y: auto;
    height: calc(100vh - 48px);
    display: flex;
    flex-direction: column;
`;

export const MenuGroup = styled.div`
    padding: 0rem 1rem 0rem 3.5rem;
`;

export const Row = styled.div`
    width: 100%;
`;

export const BackButton = styled.button`
    font-family: Equinor;
    background: none;
    border: none;
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.143em;
    color: ${tokens.colors.interactive.primary__resting.rgba};
    > svg {
        padding: 1rem;
    }

    :hover {
        background: ${tokens.colors.ui.background__light.rgba};
    }
`;

export const RightButton = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`;
