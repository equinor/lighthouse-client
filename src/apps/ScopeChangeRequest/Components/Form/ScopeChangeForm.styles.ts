import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const ButtonContainer = styled.div`
    flex-direction: row;
    gap: 0.5em;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 1em;
`;

export const ActionBar = styled.div`
    height: 64px;
    width: 100%;
    border: 1px solid ${tokens.colors.interactive.disabled__border.hex};
    background-color: white;
`;

export const FlexColumn = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    height: 100%;
    display: flex;
    gap: 10px;
    flex-direction: column;
`;

export const Section = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: flex-end;
`;

export const FormWrapper = styled.form`
    display: grid;
    grid-column: 2;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 2em;
`;

export const AttachmentName = styled.a`
    color: ${tokens.colors.interactive.primary__resting.rgba};
    cursor: 'pointer';
    text-decoration: 'none';
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const Inline = styled.span`
    display: flex;
    align-items: center;
`;

export const AttachmentsList = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0.5em 0em;
    font-size: 16px;
    align-items: center;
    width: 100%;
`;
