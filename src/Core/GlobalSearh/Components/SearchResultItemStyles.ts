import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
`;
export const Title = styled(Typography)`
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    padding: 0.25rem 0rem;
    color: ${tokens.colors.interactive.primary__resting.rgba};
`;
export const Description = styled(Typography)`
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
