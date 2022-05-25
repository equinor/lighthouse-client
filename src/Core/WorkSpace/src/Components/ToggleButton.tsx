import { tokens } from '@equinor/eds-tokens';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export type BoxProps = {
    color?: string;
    width?: string;
};

const Button = styled.button<BoxProps>`
    display: flex;
    align-items: center;
    background: transparent;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    appearance: none;
    box-sizing: border-box;
    font-family: inherit;
    border: none;
    outline: none;
    font-size: 14px;
    height: 48px;

    justify-content: center;
    width: ${(s) => s.width ?? '48px'};
    color: ${tokens.colors.text.static_icons__tertiary.rgba};
    border-bottom: ${({ 'aria-selected': selected }) =>
        selected
            ? `2px solid ${tokens.colors.interactive.primary__resting.rgba}`
            : `2px solid ${tokens.colors.ui.background__medium.rgba}`};
    cursor: pointer;

    > svg > path {
        fill: ${(props) => (props.color ? props.color : '150, 150, 150')};
    }

    :hover {
        color: ${tokens.colors.text.static_icons__secondary.rgba};
        background: ${tokens.colors.interactive.primary__hover_alt.rgba};

        > svg > path {
            fill: ${tokens.colors.text.static_icons__secondary.rgba};
        }
    }
`;

interface TabButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    width?: string;
}

export const TabButton = ({
    children,
    ...rest
}: PropsWithChildren<TabButtonProps>): JSX.Element => {
    return (
        <Button aria-selected {...rest}>
            {children}
        </Button>
    );
};
