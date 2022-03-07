import styled from 'styled-components';

export const Statuses = styled.div`
    margin-top: 15px;
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

export const HoldBy = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
    text-decoration: underline;
`;
