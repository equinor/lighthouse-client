import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const TablesTab = styled.div`
    padding-left: 8px;
    overflow: auto;
    overflow-y: auto;
    max-height: ${() => window.innerHeight - 378 + 'px'};
`;

export const WarningBanner = styled.div`
    max-width: 1060px;
    height: 30px;
    background: ${tokens.colors.ui.background__danger.hex};
    color: ${tokens.colors.text.static_icons__default.hex};
    font-size: 14px;
    font-weight: 400, regular;
    margin-left: 8px;
    border-radius: 4px;
`;

export const WarningBannerText = styled.div`
    padding-top: 8px;
    padding-left: 10px;
`;
