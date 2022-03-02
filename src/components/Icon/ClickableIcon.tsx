import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

export interface ClickableIconProps {
    name: string;
    onClick?: React.MouseEventHandler<SVGSVGElement>;
    color?: string | undefined;
}

/**
 * TODO: Make union type of available EDS icons
 * Expand with props as needed
 * Wraps EDS icon and styles it so its clickable
 * @returns Clickable SVG
 */
export const ClickableIcon = ({
    name,
    onClick,
    color = `${tokens.colors.interactive.primary__resting.hex}`,
}: ClickableIconProps): JSX.Element => {
    return <Icon name={name} onClick={onClick} style={{ cursor: 'pointer' }} color={color} />;
};
