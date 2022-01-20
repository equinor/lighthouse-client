import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Link } from 'react-router-dom';

interface AppsPanelWrapperProps {
    panelActive: boolean;
}

export const MenuWrapper = styled.div`
    overflow-y: auto;
    height: calc(100vh - 64px);
    display: flex;
    flex-direction: column;
    border-right: 1.5px solid #efefef;
    padding: 8px;
    transition: all 0.2s ease;
    background: ${tokens.colors.ui.background__light.rgba};
    z-index: 1;
    width: ${({ panelActive }: AppsPanelWrapperProps) => (panelActive ? '350px' : '55px')};

    .heading {
        background-color: transparent;
        :hover {
            ::before {
                content: ' ';
                display: block;
                background: ${tokens.colors.interactive.focus.rgba};
                position: absolute;
                left: 0;

                width: 6px;
                height: 48px;
                transition: height 0.3s ease;
            }
        }
        ::before {
            height: 0px;
            content: ' ';
        }
    }

    .noBorder {
        border: 0px;
        padding-top: 0px;
        padding-bottom: 0px;
        min-height: 0px;
        background-color: transparent;

        p {
            padding-left: 1rem;
        }
        svg {
            padding: 1rem;
            padding-left: 0px;
        }

        .link {
            color: #030303;
            text-decoration: none;
            display: block;
            padding-bottom: 0.5rem;
            padding-top: 0.5rem;
            padding-left: 2.5rem;
            :hover {
                opacity: 0.5;
            }
        }
    }
`;

export const FullscreenMenuWrapper = styled.div`
    height: calc(100vh - 64px);
    max-height: 100% !important;
    width: 100%;
    display: flex;
    flex-direction: row;
    transition: all 0.2s ease;
    z-index: 1;

    .heading {
        background-color: transparent;
        :hover {
            ::before {
                content: ' ';
                display: block;
                background: ${tokens.colors.interactive.focus.rgba};
                position: absolute;
                left: 0;

                width: 6px;
                height: 48px;
                transition: height 0.3s ease;
            }
        }
        ::before {
            height: 0px;
            content: ' ';
        }
    }

    .noBorder {
        border: 0px;
        padding-top: 0px;
        padding-bottom: 0px;
        min-height: 0px;
        background-color: transparent;
        text-decoration: none;

        p {
            padding-left: 1rem;
        }
        svg {
            padding: 1rem;
            padding-left: 0px;
        }

        .link {
            color: #007079;
            text-decoration: none;
            display: block;
            padding-bottom: 0.5rem;
            padding-top: 0.5rem;
            padding-left: 2.5rem;
            font-size: 16px;
            :hover {
                opacity: 0.5;
            }
        }
    }
`;

interface TopItemsProps {
    topDivider: boolean;
    bottomDivider: boolean;
}

export const TopItems = styled.div`
    padding-left: 1rem;
    border-top: ${({ topDivider }: TopItemsProps) => (topDivider ? `1px solid #EFEFEF` : 'none')};
    border-bottom: ${({ bottomDivider }: TopItemsProps) =>
        bottomDivider ? `1px solid #EFEFEF` : 'none'};

    .link {
        color: #030303;
        text-decoration: none;
        display: block;
        padding-bottom: 0.5rem;
        display: flex;
        align-items: center;
        :hover {
            opacity: 0.5;
        }
    }
    svg {
        padding: 1rem;
        padding-left: 0px;
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

export const FullscreenMenuItemText = styled.div`
    color: ${({ disabled }: MenuProps) => (disabled ? '#030303' : '#007079')};
    text-decoration: none;
    display: block;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5em;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    padding-left: 2.5rem;

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

export const SmallButton = styled.h2`
    height: 48px;
    margin: 0;
    border: 0px;
    padding: 0px 16px;
    cursor: pointer;
`;
export const PopoverWrapper = styled.span`
    > div > button {
        display: none !important;
    }
`;

export const GroupLink = styled(Link)`
    text-decoration: none;
    color: ${tokens.colors.text.static_icons__secondary.rgba};
    flex-grow: 1;
`;

export const FullscreenMenuAppColumn = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    padding: 1rem;
`;

export const FullscreenMenuAppGroup = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    padding: 2rem 10rem 2rem 1rem;
`;

export const FullscreenMenuGroupHeaderLink = styled(Link)`
    display: flex;
    flex-direction: row;
`;

export const FullscreenMenuGroupHeaderText = styled.h3`
    text-decoration: none;
    cursor: pointer;
    color: #030303;
`;
