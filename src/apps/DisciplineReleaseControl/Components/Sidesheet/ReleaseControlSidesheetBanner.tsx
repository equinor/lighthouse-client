import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { getYearAndWeekFromString } from '../../Functions/statusHelpers';
import { checklistTagFunc, createChecklistSteps } from '../../Functions/tableHelpers';
import { Pipetest } from '../../Types/pipetest';
import { WorkflowCompact } from '../Workflow/Components/WorkflowCompact';
import { WorkflowWarningTriangle } from '../Workflow/Components/WorkflowWarningTriangle';
import { CurrentStepContainer } from '../Workflow/Styles/styles';

interface ReleaseControlSidesheetBannerProps {
    pipetest: Pipetest;
}

export function ReleaseControlSidesheetBanner(
    props: ReleaseControlSidesheetBannerProps
): JSX.Element {
    return (
        <Banner>
            <BannerItem
                title={'Current step'}
                value={
                    <CurrentStepContainer>
                        {props.pipetest.step}
                        {!props.pipetest.pipetestProcessDoneInRightOrder && (
                            <WorkflowWarningTriangle
                                circleText={''}
                                popoverText={
                                    'Some steps in this process has been done in the wrong order'
                                }
                            />
                        )}
                    </CurrentStepContainer>
                }
            />
            <BannerItem
                title={'Workflow'}
                value={
                    <WorkflowCompact
                        steps={createChecklistSteps(props.pipetest)}
                        statusDotFunc={checklistTagFunc}
                        spanDirection={'horizontal'}
                        dotSize={22}
                    />
                }
            />
            <BannerItem title={'Status'} value={props.pipetest.shortformCompletionStatus} />
            <BannerItem
                title={'Due by week'}
                value={getYearAndWeekFromString(props.pipetest.rfccPlanned)}
            />
        </Banner>
    );
}

const Banner = styled.div`
    height: 76px;
    width: 100%;
    background-color: ${tokens.colors.ui.background__light.hex};
    display: flex;
    flex-direction: row;
    gap: 10em;
    padding: 0em 5em;
    align-items: center;
`;

interface BannerItemProps {
    title: string;
    value?: string | number | JSX.Element;
}

export function BannerItem({ title, value }: BannerItemProps): JSX.Element {
    return (
        <div>
            <BannerItemTitle>{title}</BannerItemTitle>
            <BannerItemValue>{value}</BannerItemValue>
        </div>
    );
}

const BannerItemTitle = styled.div`
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
    color: ${tokens.colors.text.static_icons__tertiary.hex};
`;

const BannerItemValue = styled.div`
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: ${tokens.colors.text.static_icons__default.hex};
    min-height: 24px;
`;
