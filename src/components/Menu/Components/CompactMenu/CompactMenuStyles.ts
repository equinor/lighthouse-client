import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const MenuWrapper = styled.div`
    overflow-y: auto;
    height: calc(100vh - 48px);
    display: flex;
    flex-direction: column;
`;

export const MenuGroup = styled.div`
    padding-left: 48px;
`;

export const Row = styled.div`
    width: 100%;
`;

export const BackButton = styled.button`
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

    :hover {
        background: ${tokens.colors.ui.background__light.rgba};
    }
`;

export const RightButton = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`;

export const IconWrapper = styled.div`
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
