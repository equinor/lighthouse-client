import { tokens } from '@equinor/eds-tokens';
import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled(ReactLink)`
    text-decoration: none;
    padding: 0px;
    margin: 0px;
`;

export const MenuIcon = styled.span`
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

interface IconWrapperProps {
    active?: boolean;
}

export const IconWrapper = styled.span`
    text-decoration: none;
    padding: 0px;
    height: 48px;
    width: 48px;
    overflow: hidden;
    margin: 0px;

    :active {
        background: ${({ active }: IconWrapperProps) =>
            active ? `${tokens.colors.interactive.primary__hover_alt.rgba}` : 'none'};
    }

    :hover {
        background: ${tokens.colors.interactive.primary__hover_alt.rgba};
        border-radius: 50%;
        display: block;
    }
`;
