import { Chip, Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 44px;
`;

export const FlexColumn = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 44px;
    max-width: 600px;
`;

export const FormWrapper = styled.form`
    display: grid;
    grid-column: 2;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 2em;
`;

export const InnerSection = styled.span`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

export const SectionHeading = styled.div`
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
`;

export const SubSectionText = styled.div`
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    white-space: break-spaces;
`;

export const SubSectionTitle = styled.div`
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0px;
    text-align: left;
`;

export const SectionWrapper = styled.div`
    margin-left: 5px;
`;

export const Banner = styled.div<{ padding?: string }>`
    height: 76px;
    width: 100%;
    background-color: ${tokens.colors.ui.background__light.hex};
    display: flex;
    flex-direction: row;
    gap: 5rem;
    padding: ${({ padding = 0 }) => `${padding}`};
    align-items: center;
`;

export const BannerItemTitle = styled.div`
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
    color: ${tokens.colors.text.static_icons__tertiary.hex};
`;

export const BannerItemValue = styled.div`
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: ${tokens.colors.text.static_icons__default.hex};
    min-height: 24px;
`;

export const BannerWarningTriangle = styled.div`
    margin-top: 3px;
    margin-left: 3px;
`;

export const NoScope = styled.div`
    font-size: 14px;
    font-weight: 400;
`;

export const SpinnerChip = styled(Chip)`
    margin-left: 10px;
    margin-top: 12px;
    background-color: ${tokens.colors.interactive.primary__selected_hover.hex};
`;

export const ChipText = styled.div`
    font-size: 16px;
    text-align: center;
`;

export const HeaderTab = styled(Tabs.Tab)``;
export const SidesheetTabList = styled(Tabs.List)`
    background-color: ${tokens.colors.ui.background__light.hex};
`;
export const TabList = styled(Tabs.Panels)`
    margin: 24px 32px;
`;

export const Tab = styled(Tabs.Panel)`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
    padding-bottom: 50px;
`;

export const SidesheetWrapper = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    overflow: scroll;
    height: 100%;
`;
