import { Card, Progress } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const ChartsWrapper = styled(Card)`
    width: 100%;
    height: 350px;
    margin: 0rem 0.5rem;
    grid-gap: 0;
    overflow: scroll;
`;
export const Loading = styled.p`
    width: 100%;
    height: 350px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Circular = styled(Progress.Circular)`
    padding: 1rem;
`;
