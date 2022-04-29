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
    font-size: 14px;
    /* word-wrap: break-word; */
`;
export const TimeStamp = styled.div`
    font-size: 10px;
    font-weight: 500;
    text-align: right;
`;

export const RightSection = styled.div`
    display: flex;
`;

export const LeftSection = styled.div`
    display: flex;
    gap: 1em;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
`;

export const Wrapper = styled.div`
    /* height: 31px; */
    /* width: 200px; */
    display: grid;
    grid-template-columns: 1fr auto 80px;
    text-align: left;
    align-items: center;
    justify-content: space-between;
    border-top: 1px ${tokens.colors.interactive.disabled__border.hex} solid;
    padding: 0.45rem 0em;
    cursor: pointer;
`;

export const DetailText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
