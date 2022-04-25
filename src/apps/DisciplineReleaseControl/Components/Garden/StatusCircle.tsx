import styled from 'styled-components';

import { tokens } from '@equinor/eds-tokens';

type StatusIconProps = {
    statusColor: string;
};

const Circle = styled.div<StatusIconProps>`
    width: 14px;
    height: 14px;
    outline: 1px solid ${tokens.colors.text.static_icons__primary_white.rgba};
    background-color: ${(props) => props.statusColor};
    border-radius: 50%;
    margin-left: 4px;
`;

export const StatusCircle = ({ statusColor }: StatusIconProps): JSX.Element => (
    <Circle statusColor={statusColor} />
);
