import styled from 'styled-components';

export const IconsContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto;
    padding-top: 10px;
`;

export const WarningContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row: 1;
    gap: 5px;
`;
export const WarningIcon = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;

    > strong {
        font-size: 14px;
    }
`;
export const WarningText = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-self: flex-end;
    white-space: initial;

    > p {
        text-decoration: underline;
        font-size: 14px;
    }
`;
export const FlagUnsignedAction = styled.div`
    display: flex;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row: 1;
    justify-content: end;
    align-items: flex-start;
    gap: 5px;

    > p {
        text-decoration: underline;
        font-size: 14px;
    }
`;

export const Statuses = styled.div`
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8;

    > div {
        margin-right: 16px;

        &:last-child {
            margin: 0;
        }
    }
`;
