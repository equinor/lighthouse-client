import { isProduction } from '@equinor/portal-client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppManifest } from '../../Core/Client/Types';
import Icon from '../Icon/Icon';
import { ContentWrapper, DItem, MItem, Title } from './MenuItemStyles';
import { getURL } from './utils';

interface MenuItemProps {
    manifest: AppManifest;
    appId: string;
    onClick?: () => void;
    isFullMenu?: boolean;
}

export const MenuItem = ({ manifest, appId, onClick, isFullMenu }: MenuItemProps): JSX.Element => {
    const isProd = isProduction();
    const navigate = useNavigate();
    const [showIcon, setShowIcon] = useState(false);

    return isFullMenu ? (
        <DItem
            isLink={manifest.uri !== undefined}
            active={location.pathname.includes(`${appId}/${manifest.shortName}`)}
            title={!manifest.isProduction && isProd ? 'Disabled' : manifest.title}
            onClick={() => {
                manifest.uri ? window.open(manifest.uri) : navigate(getURL(manifest, appId));
                onClick && onClick();
            }}
            onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => setShowIcon(false)}
            disabled={!manifest.isProduction}
        >
            <ContentWrapper>
                {manifest.uri && (
                    <Icon
                        style={{ opacity: showIcon && manifest.isProduction ? 1 : 0 }}
                        name="external_link"
                    />
                )}
                <Title disabled={!manifest.isProduction}>{manifest.title}</Title>
            </ContentWrapper>
        </DItem>
    ) : (
        <MItem
            isLink={manifest.uri !== undefined}
            active={location.pathname.includes(`${appId}/${manifest.shortName}`)}
            title={!manifest.isProduction && isProd ? 'Disabled' : manifest.title}
            onClick={() => {
                manifest.uri ? window.open(manifest.uri) : navigate(getURL(manifest, appId));
                onClick && onClick();
            }}
            onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => setShowIcon(false)}
        >
            <ContentWrapper>
                {manifest.uri && (
                    <Icon style={{ opacity: showIcon ? 1 : 0 }} name="external_link" />
                )}
                <Title>{manifest.title}</Title>
            </ContentWrapper>
        </MItem>
    );
};
