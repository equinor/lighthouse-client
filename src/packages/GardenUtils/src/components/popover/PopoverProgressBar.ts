import styled from 'styled-components';

type PopoverProgressBarProps = {
    barColor: string;
    textColor: string;
};
export const PopoverProgressBar = styled.div<PopoverProgressBarProps>`
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
    gap: 1rem;
    > strong:first-child {
        margin-right: 32px;
    }
`;
