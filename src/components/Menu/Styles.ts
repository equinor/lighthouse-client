import { tokens } from '@equinor/eds-tokens';
import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';

interface AppsPanelWrapperProps {
    panelActive: boolean;
}

export const MenuWrapper = styled.div`
    overflow-y: auto;
    height: calc(100vh - 48px);
    display: flex;
    flex-direction: column;
    transition: all 0.2s ease;
    background: ${tokens.colors.ui.background__light.rgba};
    z-index: 1;
    width: ${({ panelActive }: AppsPanelWrapperProps) => (panelActive ? '350px' : '48px')};
`;

export const LinkWrapper = styled(ReactLink)`
    text-decoration: none;
    padding: 0px;
    margin: 0px;
`;

export const LinkIcon = styled.span`
    display: grid;
    gap: 8px;
    grid-auto-flow: column;
    -webkit-box-align: center;
    align-items: center;
    height: 100%;
    -webkit-box-pack: center;
    justify-content: center;
    height: 48px;
`;

interface LinkIconWrapperProps {
    active: boolean;
}

export const LinkIconWrapper = styled.span`
    display: block;
    padding: 0px;
    height: 48px;
    width: 48px;
    overflow: hidden;
    margin: 0px;
    background: ${({ active }: LinkIconWrapperProps) =>
        active ? `${tokens.colors.interactive.primary__hover_alt.rgba}` : ''};

    :hover {
        background: ${tokens.colors.interactive.primary__hover_alt.rgba};
        border-radius: ${({ active }: LinkIconWrapperProps) => (active ? 0 : '50%')};
        display: block;
    }
`;

export const MenuItems = styled.div`
    bottom: 1rem;
    position: absolute;
    padding-left: 1rem;
    border-top: 1px solid #efefef;

    svg {
        padding: 1rem;
        padding-left: 0px;
    }
`;

interface MenuProps {
    disabled?: boolean;
}

export const MenuItemText = styled.div`
    color: ${({ disabled }: MenuProps) => (disabled ? '#007079' : '#565656')};
    text-decoration: none;
    display: block;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5em;
    padding-top: 1rem;
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
    left: 30%;
    position: absolute;
    margin-bottom: 3rem;
`;

export const SmallItem = styled.div`
    /* :hover {
        background-color: ${tokens.colors.ui.background__light.rgba};
    } */
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
    /* padding: 0px 16px; */
    cursor: pointer;
`;
export const PopoverWrapper = styled.span`
    > div > button {
        display: none !important;
    }
`;

export const GroupLink = styled(ReactLink)`
    text-decoration: none;
    color: ${tokens.colors.text.static_icons__secondary.rgba};
    flex-grow: 1;
`;
