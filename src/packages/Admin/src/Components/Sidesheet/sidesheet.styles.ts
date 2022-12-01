import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    overflow: scroll;
    height: 100%;
    margin: 24px 32px;
`;

export const FlexColumn = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    height: 100%;
    display: flex;
    gap: 10px;
    flex-direction: column;
    width: 600px;
    max-width: 95%;
    margin-left: 4px;
`;

export const ActionBar = styled.div`
    height: 64px;
    width: 100%;
    border: 1px solid ${tokens.colors.interactive.disabled__border.hex};
    background-color: white;
    margin-top: 100px;
    max-width: 95%;
`;

export const ButtonContainer = styled.div`
    flex-direction: row;
    gap: 0.5em;
    display: flex;
    align-items: center;
    padding: 1em;
    float: right;
`;

export const SelectionRow = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SelectTemplateText = styled.div`
    font-weight: 400;
    font-size: 16px;
`;
export const SelectExistingWorkflow = styled.div`
    margin-top: 16px;
    margin-left: 16px;
    margin-bottom: 16px;
`;
