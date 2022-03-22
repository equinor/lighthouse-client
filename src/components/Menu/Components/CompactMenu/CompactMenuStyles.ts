import { Button } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const MenuWrapper = styled.div`
    overflow-y: auto;
    height: calc(100vh - 48px);
    display: flex;
    flex-direction: column;
`;

export const MenuGroupe = styled.div`
    padding: 1rem 3rem;
`;

export const Row = styled.div`
    width: 100%;
`;

export const RightButton = styled(Button)`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

export const LeftButton = styled(Button)`
    width: 100%;
    display: flex;
    justify-content: flex-start;
`;
