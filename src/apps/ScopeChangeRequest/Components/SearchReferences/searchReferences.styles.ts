import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const SelectContainer = styled.div`
    flex-basis: 30%;
    border-bottom: none;
`;

export const SearchContainer = styled.div`
    flex-basis: 70%;
    border-bottom: none;
`;

export const Inline = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1em;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 0.5em;
    gap: 0.2em;
`;

export const Wrapper = styled.div`
    width: 100%;
`;

export const ErrorWrapper = styled.div`
    font-size: 12px;
    color: red;
`;

export const ListItem = styled.div`
    display: grid;
    grid-template-columns: 1fr 24fr 1fr;
    gap: 1em;
    text-overflow: ellipsis;
    color: ${tokens.colors.interactive.primary__resting.hex};
    height: 52px;
`;

export const SelectedItemLabel = styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
`;

export const Title = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
`;

export const TitleBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
`;
