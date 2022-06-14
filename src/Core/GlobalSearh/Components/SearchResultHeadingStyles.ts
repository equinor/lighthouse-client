import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-top: 1rem;
`;

export const Title = styled(Typography)`
    margin: 0.5rem 0.5rem 0rem 0.5rem;
`;
export const Color = styled.div<{ color: string }>`
    height: 32px;
    width: 8px;
    background: ${({ color }) => color};
`;
