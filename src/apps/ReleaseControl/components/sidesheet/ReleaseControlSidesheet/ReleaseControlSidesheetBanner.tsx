import { useReleaseControlContext } from '../../../hooks/useReleaseControlContext';
import { Banner, BannerItemTitle, BannerItemValue } from './sidesheetStyles';

export function ReleaseControlSidesheetBanner(): JSX.Element {
    const { releaseControl } = useReleaseControlContext();

    return (
        <Banner>
            <BannerItem title="" value="" />
            <BannerItem title={'Phase'} value={releaseControl.phase} />
            <BannerItem title={'Status'} value={releaseControl.workflowStatus} />
            <BannerItem
                title={'State'}
                value={releaseControl.isVoided ? 'Voided' : releaseControl.state}
            />
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
