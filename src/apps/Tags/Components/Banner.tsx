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
    gap: 2rem;
    padding: 0em 2rem;
    align-items: center;
`;
