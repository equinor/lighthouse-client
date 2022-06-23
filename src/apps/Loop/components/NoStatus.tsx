import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
type NoStatusProps = {
    size: 'small' | 'medium';
};
export const NoStatus = styled.div<NoStatusProps>`
    outline: ${(props) =>
        `${props.size === 'small' ? '2px' : '4px'} dashed ${
            tokens.colors.ui.background__medium.hex
        }`};
    border-radius: ${(props) => (props.size === 'small' ? '17px' : '21px')};
    height: ${(props) => (props.size === 'small' ? '16px' : '20px')};
    width: ${(props) => (props.size === 'small' ? '16px' : '20px')};
`;
