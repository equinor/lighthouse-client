import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

// const ThreeDModel = styled.div`
//     height: 100vh;
// `;

export const TablesTab = styled.div`
    padding-left: 8px;
    overflow: auto;
    overflow-y: auto;
    max-height: ${() => window.innerHeight - 378 + 'px'};
`;

export const WarningBanner = styled.div`
    width: 100%;
    height: 30px;
    background: ${tokens.colors.interactive.danger__resting.hex};
    color: ${tokens.colors.text.static_icons__primary_white.hex};
    font-size: 14px;
    font-weight: 400, regular;
`;

export const WarningBannerText = styled.div`
    padding-top: 8px;
    padding-left: 8px;
`;
