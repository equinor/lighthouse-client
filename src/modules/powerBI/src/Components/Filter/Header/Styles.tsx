import { Button } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export const Title = styled.div`
    font-weight: 600;
`;
export const SearchButton = styled(Button)`
    width: 36px;
    height: 36px;
`;
