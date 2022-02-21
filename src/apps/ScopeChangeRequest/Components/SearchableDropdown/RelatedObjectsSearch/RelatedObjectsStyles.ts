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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;

export const Spacer = styled.div`
    margin-right: 0.5em;
`;

export const Title = styled.div`
    line-height: 24px;
    font-size: 18px;
    color: black;
    font-weight: bold;
`;

export const TitleBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
