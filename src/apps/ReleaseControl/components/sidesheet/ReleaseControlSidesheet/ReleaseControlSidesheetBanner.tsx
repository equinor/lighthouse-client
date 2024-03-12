import { CircularProgress } from '@equinor/eds-core-react-old';
import { useIsReleaseControlMutatingOrFetching } from '../../../hooks';
import { useReleaseControlContext } from '../../../hooks/useReleaseControlContext';
import { Banner, BannerItemTitle, BannerItemValue, ChipText, SpinnerChip } from './sidesheetStyles';
import { resolveDaysOnStep } from '../../../workspaceConfig';

export function ReleaseControlSidesheetBanner(): JSX.Element {
    const { releaseControl } = useReleaseControlContext();
    const isLoading = useIsReleaseControlMutatingOrFetching(releaseControl.id);

    const totalSteps = releaseControl.workflowSteps.length;

    const daysOnLastStep = () => {
        const timeOnLastStep =
            releaseControl.workflowSteps.toReversed().find((step) => {
                if (step.criterias[0]?.signedAtUtc) {
                    return true;
                }
            })?.criterias[0].signedAtUtc ?? releaseControl.createdAtUtc.toString();

        const daysOnStep = resolveDaysOnStep(timeOnLastStep);
        return daysOnStep;
    };

    return (
        <Banner>
            <BannerItem title="" value="" />
            <BannerItem title="Current step" value={releaseControl.currentWorkflowStep.name} />
            <BannerItem title="Time on curr. step" value={`${daysOnLastStep()} days`} />
            <BannerItem
                title="Curr. step/tot. steps"
                value={`${releaseControl.currentWorkflowStep.order + 1}/${totalSteps}`}
            />
            <BannerItem
                title={'RC State'}
                value={releaseControl.isVoided ? 'Voided' : releaseControl.state}
            />
            {isLoading && (
                <SpinnerChip>
                    <CircularProgress size={16} />
                    <ChipText>Processing...</ChipText>
                </SpinnerChip>
            )}
        </Banner>
    );
}

interface BannerItemProps {
    title: string;
    value: string | number | JSX.Element;
}

export function BannerItem({ title, value }: BannerItemProps): JSX.Element {
    return (
        <div>
            <BannerItemTitle>{title}</BannerItemTitle>
            <BannerItemValue>{value}</BannerItemValue>
        </div>
    );
}
