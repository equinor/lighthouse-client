import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { useScopeChangeContext } from '../../../Hooks/context/useScopeChangeContext';

export function SidesheetBanner(): JSX.Element {
    const { request } = useScopeChangeContext();

    return (
        <Banner>
            <BannerItem title={'Phase'} value={request.phase} />
            <BannerItem title={'Change category'} value={request.changeCategory.name} />
            <BannerItem
                title="Change origin"
                value={
                    request.originSource !== 'NotApplicable'
                        ? `${request.originSource} - ${request.originSourceId}`
                        : request.originSource
                }
            />
            <BannerItem title={'Status'} value={request.workflowStatus ?? ''} />
            <BannerItem title={'State'} value={request.isVoided ? 'Voided' : request.state} />
        </Banner>
    );
}

const Banner = styled.div`
    height: 76px;
    width: 100%;
    background-color: ${tokens.colors.ui.background__light.hex};
    display: flex;
    flex-direction: row;
    gap: 5rem;
    padding: 0em 5em;
    align-items: center;
`;

interface BannerItemProps {
    title: string;
    value: string | number;
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
