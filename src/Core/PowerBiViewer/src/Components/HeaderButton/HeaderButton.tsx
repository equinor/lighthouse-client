import { tokens } from '@equinor/eds-tokens';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Button = styled.button`
    display: flex;
    align-items: center;
    background: transparent;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: hidden;
    appearance: none;
    box-sizing: border-box;
    font-family: inherit;
    border: none;
    outline: none;
    font-size: 1rem;
    height: 48px;
    padding-left: 16px;
    padding-right: 16px;
    color: ${tokens.colors.text.static_icons__tertiary.rgba};
    border-bottom: ${({ 'aria-selected': selected }) =>
        selected
            ? `2px solid ${tokens.colors.interactive.primary__resting.rgba}`
            : `2px solid ${tokens.colors.ui.background__medium.rgba}`};
    cursor: pointer;

    > svg > path {
        fill: rgb(150, 150, 150);
    }

    :hover {
        color: ${tokens.colors.text.static_icons__secondary.rgba};
        background: ${tokens.colors.interactive.primary__hover_alt.rgba};

        > svg > path {
            fill: ${tokens.colors.text.static_icons__secondary.rgba};
        }
    }
`;

export const HeaderButton = ({
    children,
    ...rest
}: PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>>): JSX.Element => {
    return (
        <Button aria-selected {...rest}>
            {children}
        </Button>
    );
};
