import { CircularProgress } from '@equinor/eds-core-react-old';
import { useIsReleaseControlMutatingOrFetching } from '../../../hooks';
import { useReleaseControlContext } from '../../../hooks/useReleaseControlContext';
import { Banner, BannerItemTitle, BannerItemValue, ChipText, SpinnerChip } from './sidesheetStyles';
import { resolveDaysOnStep } from '../../../workspaceConfig';
import { Criteria } from '@equinor/Workflow';

export function ReleaseControlSidesheetBanner(): JSX.Element {
  const { releaseControl } = useReleaseControlContext();
  const isLoading = useIsReleaseControlMutatingOrFetching(releaseControl.id);

  const totalSteps = releaseControl.workflowSteps.length;

  const daysOnLastStep = () => {
    const lastStep = releaseControl.workflowSteps
      .filter((s) => s.criterias.every((s) => !!s.signedAtUtc))
      .flatMap((s) => s.criterias)
      .reduce((acc, curr) => {
        if (!acc) return curr;
        return new Date(acc.signedAtUtc).getTime() > new Date(curr.signedAtUtc).getTime()
          ? acc
          : curr;
      }, null as Criteria | null)?.signedAtUtc;

    const daysOnStep = resolveDaysOnStep(lastStep ?? releaseControl.createdAtUtc.toString());
    return daysOnStep;
  };

  return (
    <Banner>
      <BannerItem title="" value="" />
      <BannerItem
        title="Current step"
        value={releaseControl.currentWorkflowStep?.name ?? 'RC completed'}
      />
      <BannerItem title="Time on curr. step" value={`${daysOnLastStep()} days`} />
      <BannerItem
        title="Curr. step/tot. steps"
        value={`${
          releaseControl.currentWorkflowStep?.order !== undefined
            ? releaseControl.currentWorkflowStep?.order + 1
            : totalSteps
        }/${totalSteps}`}
      />
      <BannerItem
        title="Target date"
        value={new Date(releaseControl.plannedDueDate).toLocaleDateString('en-gb')}
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
