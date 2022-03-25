import { Scrim } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';

export const MenuScrim = styled(Scrim)`
    animation: MenuScrimAnimation ease 0.3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    @keyframes MenuScrimAnimation {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

export const FullscreenMenuWrapper = styled.div`
    height: calc(100vh - 48px);
    max-height: 100% !important;
    position: absolute;
    top: 48px;
    left: 0px;
    background: ${tokens.colors.ui.background__default.rgba};
    transition: all 0.15s ease;
    z-index: 1;
    border-right: 1.5px solid #e0e0e0;

    animation: FullscreenMenuWrapperAnimation ease 0.3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    @keyframes FullscreenMenuWrapperAnimation {
        0% {
            left: -900px;
        }
        100% {
            left: 0px;
        }
    }
`;

export const FullscreenMenuItems = styled.div`
    bottom: 1rem;
    left: 1rem;
    position: absolute;
    padding-left: 0.5rem;

    svg {
        padding: 1rem;
        padding-left: 0px;
    }
`;

interface MenuProps {
    disabled?: boolean;
}

export const FullscreenMenuItemText = styled.div`
    color: ${({ disabled }: MenuProps) => (disabled ? '#030303' : '#007079')};
    text-decoration: none;
    display: flex;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5em;
    align-items: center;
    padding-left: 2.5rem;
    height: 34px;

    cursor: ${({ disabled }: MenuProps) => (disabled ? 'default' : 'pointer')};

    :hover {
        opacity: ${({ disabled }: MenuProps) => (disabled ? 1.0 : 0.5)};
    }
`;

export const MenuItem = styled.div`
    display: flex;
    cursor: pointer;
    color: #030303;
`;

export const SearchWrapper = styled.div`
    padding: 1rem;
`;

export const FullscreenSearchWrapper = styled.div`
    padding: 0.5rem;
    width: 30%;
    left: 1rem;
    position: absolute;
    margin-bottom: 3rem;
`;

export const SmallItem = styled.div`
    :hover {
        background-color: ${tokens.colors.ui.background__light.rgba};
    }
`;

export const Title = styled.div`
    font-weight: 800;
    display: flex;
    flex-direction: row;
`;

export const Content = styled.div`
    .link {
        color: #030303;
        text-decoration: none;
        display: block;
        padding-bottom: 1rem;
        font-size: 14px;

        :hover {
            opacity: 0.5;
        }
    }
`;

export const SmallButton = styled.span`
    height: 48px;
    margin: 0;
    border: 0px;
    text-decoration: none;
    cursor: pointer;
`;
export const PopoverWrapper = styled.span`
    > div > button {
        display: none !important;
    }
`;
interface LinkProps {
    active?: boolean;
    disabled?: boolean;
}

export const Link = styled(ReactLink)`
    text-decoration: none;
    color: ${({ disabled }: LinkProps) =>
        disabled
            ? tokens.colors.interactive.disabled__text.rgba
            : tokens.colors.interactive.primary__hover.rgba};
    flex-grow: 1;
    text-decoration: none;
    display: flex;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    padding-left: 2.5rem;
    font-size: 16px;
    cursor: ${({ disabled }: LinkProps) => (disabled ? 'default' : 'pointer')};
    :hover {
        background-color: ${({ disabled }: MenuProps) =>
            disabled ? 'none' : `${tokens.colors.interactive.primary__hover_alt.rgba}`};
    }
    background: ${({ active }: LinkProps) =>
        active ? `${tokens.colors.interactive.primary__hover_alt.rgba}` : ''};
`;

export const MenuItemExternalLink = styled.a`
    text-decoration: none;
    color: ${({ disabled }: LinkProps) =>
        disabled
            ? tokens.colors.interactive.disabled__text.rgba
            : tokens.colors.interactive.primary__hover.rgba};
    flex-grow: 1;
    text-decoration: none;
    display: flex;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    padding-left: 2.5rem;
    font-size: 16px;
    cursor: ${({ disabled }: LinkProps) => (disabled ? 'default' : 'pointer')};
    :hover {
        background-color: ${({ disabled }: MenuProps) =>
            disabled ? 'none' : `${tokens.colors.interactive.primary__hover_alt.rgba}`};
    }
    background: ${({ active }: LinkProps) =>
        active ? `${tokens.colors.interactive.primary__hover_alt.rgba}` : ''};
`;

export const HeaderLink = styled(ReactLink)`
    display: flex;
    flex-direction: row;
    border: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
    min-height: 0px;
    background-color: transparent;
    text-decoration: none;
    align-items: flex-end;
    align-items: center;

    svg {
        padding: 0.5rem;
        padding-left: 0px;
        cursor: default;
    }
`;

export const MenuColumn = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
`;
export const MenuRow = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1rem 2rem 0rem 1rem;
`;

export const FullscreenMenuGroupHeaderText = styled.h3`
    text-decoration: none;
    cursor: pointer;
    color: #030303;
    margin-bottom: 0.5rem;
    font-size: 14px;
    cursor: default;
    font-weight: 500;
`;
