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

export const BackButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0;
`;
export const MenuGroupHeading = styled.div`
    display: flex;
    align-content: center;
    align-items: flex-end;
    padding-left: 48px;
    flex-grow: 1;
    text-decoration: none;
    display: flex;
    align-items: center;
    height: 23px;
    width: 240px;
    font-size: 14px;
`;

export const RightButton = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`;

export const IconWrapper = styled.button`
    position: absolute;
    background: none;
    border: none;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${tokens.colors.interactive.primary__resting.rgba};

    :hover {
        background: ${tokens.colors.ui.background__light.rgba};
    }
`;
