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
`;

export const Result = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 635px;
`;

export const StidWrapper = styled.div`
    background-color: white;
    width: 640px;
    min-height: 800px;
    max-height: 100vh;
    overflow: scroll;
    padding: 20px;
`;

export const Title = styled.h2`
    font-weight: normal;
`;

export const StidHeader = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

export const AdvancedSearch = styled.div`
    height: 48px;
    width: 178px;
    display: flex;
    align-items: center;
    color: ${tokens.colors.interactive.primary__resting.hex};
    justify-content: space-evenly;
    font-size: 14px;
    cursor: pointer;
`;
