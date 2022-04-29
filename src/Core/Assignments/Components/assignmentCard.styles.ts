import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const DueDate = styled.div<{ overdue: boolean }>`
    font-size: 16px;
    color: ${(p) =>
        p.overdue
            ? tokens.colors.infographic.primary__energy_red_100.hex
            : tokens.colors.text.static_icons__default.hex};
`;

export const NotificationTitle = styled.div`
    font-size: 16px;
`;
export const TimeStamp = styled.div`
    font-size: 10px;
`;

export const RightSection = styled.div`
    display: flex;
`;

export const LeftSection = styled.div`
    display: flex;
    gap: 1em;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

export const Wrapper = styled.div`
    display: flex;
    height: 20px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    border-top: 1px #e7deea solid;
    padding: 0 0em;
    cursor: pointer;
`;

export const DetailText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
