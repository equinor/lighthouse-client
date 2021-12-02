import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const DataViewWrapper = styled.section`
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    justify-content: space-between;
`;

export const Wrapper = styled.div`
    position: relative;
    height: calc(100vh - 64px);
    z-index: 100;
    background: #fff;
    width: 650px;
    min-width: 650px;
    grid-area: sidebar;
`;

export const Section = styled.section`
    background-color: ${tokens.colors.ui.background__default.rgba};
    margin: 2rem;
    margin-bottom: 1rem;
    overflow: auto;
`;

export const DataGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const DataEntry = styled.div`
    width: 150px;
    max-width: 250px;
    padding-right: 120px;
`;

export const Description = styled.div`
    width: 100%;
    padding: 2rem;
    background-color: ${tokens.colors.ui.background__info.rgba};
    margin-bottom: 1rem;
`;

export const Title = styled.h2`
    margin-top: 0.2rem;
    margin-bottom: 0;
`;
