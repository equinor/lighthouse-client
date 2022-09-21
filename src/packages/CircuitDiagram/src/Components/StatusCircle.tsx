import styled from 'styled-components';

import { tokens } from '@equinor/eds-tokens';

type StatusIconProps = {
    statusColor: string;
    size?: number;
};

const Circle = styled.div<StatusIconProps>`
    width: ${(props) => (props.size ? props.size + 'px' : '14px')};
    height: ${(props) => (props.size ? props.size + 'px' : '14px')};
    outline: 1px solid ${tokens.colors.text.static_icons__primary_white.rgba};
    background-color: ${(props) => props.statusColor};
    border-radius: 50%;
    margin-left: 4px;
`;
/**
 * Component displaying a circle with some predefined styles for the Garden package item.
 */
export const StatusCircle = ({ statusColor, size }: StatusIconProps): JSX.Element => (
    <Circle statusColor={statusColor} size={size} />
);
