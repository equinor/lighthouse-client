import { Typography as Typo } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Typography = styled(Typo)`
    margin-top: 1rem;
`;
