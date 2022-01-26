import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.section`
    padding: 2rem;
`;

export const Header = styled.div`
    margin: 0.5rem;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: fit-content;
    width: 100%;
`;

export const MainColumn = styled.div`
    width: 70%;
    margin-right: 1rem;
    height: fit-content;
    display: flex;
    flex-direction: column;
`;
export const SideColumn = styled.div`
    width: 30%;

    height: fit-content;
    display: flex;
    flex-direction: column;
`;

export const KpiBar = styled.div`
    margin: 0.5rem;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export const KpiItem = styled.div`
    flex: 1;
    margin-left: 1rem;
    background-color: green;

    :first-child {
        margin-left: 0;
    }
`;

export const Main = styled.div`
    margin: 0.5rem;
    height: 500px;
    width: 100%;
    background-color: ${tokens.colors.ui.background__light.rgba};
`;

export const SideItem = styled.div`
    margin: 0.5rem;
    height: 325px;
    width: 100%;
    background-color: ${tokens.colors.ui.background__light.rgba};
`;
