import { Button } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const StyledButton = styled(Button)<{ width?: string }>`
    width: ${(props) => props.width || '150px'};
`;
