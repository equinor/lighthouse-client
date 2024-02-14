import { CircularProgress } from '@equinor/eds-core-react-old';
import { useIsReleaseControlMutatingOrFetching } from '../../../hooks';
import { useReleaseControlContext } from '../../../hooks/useReleaseControlContext';
import { Banner, BannerItemTitle, BannerItemValue, ChipText, SpinnerChip } from './sidesheetStyles';

export function ReleaseControlSidesheetBanner(): JSX.Element {
    const { releaseControl } = useReleaseControlContext();
    const isLoading = useIsReleaseControlMutatingOrFetching(releaseControl.id);
    return (
        <Banner>
            <BannerItem title="" value="" />
            <BannerItem title={'Phase'} value={releaseControl.phase} />
            <BannerItem title={'Status'} value={releaseControl.workflowStatus} />
            <BannerItem
                title={'State'}
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
