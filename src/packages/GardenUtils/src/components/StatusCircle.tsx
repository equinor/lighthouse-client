import styled from 'styled-components';

import { tokens } from '@equinor/eds-tokens';

type StatusIconProps = {
    statusColor: string;
};

const Circle = styled.div<StatusIconProps>`
    width: 14px;
    height: 14px;
    border: 1px solid ${tokens.colors.text.static_icons__primary_white.rgba};
    background-color: ${(props) => props.statusColor};
    border-radius: 50%;
    margin: 0px 1px;
`;
/**
 * Component displaying a circle with some predefined styles for the Garden package item.
 */
export const StatusCircle = ({ statusColor }: StatusIconProps): JSX.Element => (
    <Circle statusColor={statusColor} />
);
