import styled from 'styled-components';

export const PopoverContainer = styled.div`
    white-space: nowrap;

    hr {
        border: 1px solid #dcdcdc;
    }

    h5 {
        margin-top: 0;
        margin-bottom: 0;
    }

    p {
        margin: 0;
        font-size: 12px;
    }
`;
type CommStatusProps = {
    barColor: string;
    textColor: string;
};
export const CommStatus = styled.div<CommStatusProps>`
    display: flex;
    border-radius: 4px;
    font-size: 12px;
    height: 24px;
    padding: 4px 8px;
    margin-top: 16px;
    text-transform: capitalize;
    background: ${(p) => p.barColor};
    color: ${(p) => p.textColor};
    line-height: 24px;
    text-align: center;
    justify-content: space-between;
    > strong:first-child {
        margin-right: 32px;
    }
`;

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
type StatusProps = {
    color: string;
};
export const Status = styled.div<StatusProps>`
    width: 40px;
    height: 24px;
    display: flex;
    align-self: center;
    border: none;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    border-radius: 12px;
    background: ${(p) => p.color};
`;
export const HoldBy = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
    text-decoration: underline;
`;
