import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MiniWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 30px;
    margin-left: 3px;
    margin-right: 6px;
`;

export const MenuText = styled(Typography)`
    font-size: 16px;
`;
