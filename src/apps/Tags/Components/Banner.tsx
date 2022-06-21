import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

interface SidesheetBannerProps {
    children: React.ReactNode;
}

export function SidesheetBanner({ children }: SidesheetBannerProps): JSX.Element {
    return <Banner>{children}</Banner>;
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
        <Wrapper>
            <BannerItemTitle>{title}</BannerItemTitle>
            <BannerItemValue>{value}</BannerItemValue>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    padding: 0.5rem 0;
`;

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
