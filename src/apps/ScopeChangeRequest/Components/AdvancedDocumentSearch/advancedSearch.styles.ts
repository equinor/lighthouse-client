import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

export const IconContainer = styled.div`
    height: 24px;
    width: 24px;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;
export const ResultLabel = styled.div`
    overflow: hidden;
    white-space: nowrap;
    max-width: 500px;
    font-size: 16px;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;

export const ResultItem = styled.div`
    display: flex;
    align-items: center;
    width: 635px;
`;

export const Wrapper = styled.div`
    background-color: white;
    width: 640px;
    width: 50vw;
    height: 70vh;
    overflow-y: scroll;
    padding: 20px;
`;

export const Title = styled.h2`
    font-weight: normal;
`;

export const ModalHeader = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

export const AdvancedSearch = styled.div`
    height: auto;
    width: 178px;
    display: flex;
    align-items: center;
    color: ${tokens.colors.interactive.primary__resting.hex};
    justify-content: space-evenly;
    font-size: 14px;
    cursor: pointer;
`;

export const SearchField = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 1em;
`;
