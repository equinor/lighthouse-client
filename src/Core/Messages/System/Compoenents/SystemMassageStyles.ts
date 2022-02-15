import { Banner as EDSBanner } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
interface BannerProps {
    iconColor: string;
    background: string;
}
export const Banner = styled(EDSBanner)`
    top: 48px;
    position fixed;
    width: 100%;
    height: 48px;
    > div {
        padding: 0.5rem 1rem;
        background: ${({ background }: BannerProps) => background};
        
        > span {
            background: ${({ iconColor }: BannerProps) => iconColor};
            color: ${tokens.colors.text.static_icons__primary_white.rgba};
        }
        
    }

    > hr {
        background: transparent;
    }
`;
