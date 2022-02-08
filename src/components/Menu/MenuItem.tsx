import { isAppActive } from '@equinor/portal-client';
import { useMemo, useState } from 'react';
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
    const navigate = useNavigate();
    const [showIcon, setShowIcon] = useState(false);
    const isActive = useMemo(() => isAppActive(manifest), [manifest]);

    return isFullMenu ? (
        <DItem
            isLink={manifest.uri !== undefined}
            active={location.pathname.includes(`${appId}/${manifest.shortName}`)}
            title={isActive ? manifest.title : 'Disabled'}
            onClick={() => {
                manifest.uri ? window.open(manifest.uri) : navigate(getURL(manifest, appId));
                onClick && onClick();
            }}
            onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => setShowIcon(false)}
            disabled={!isActive}
        >
            <ContentWrapper>
                {manifest.uri && (
                    <Icon
                        size={16}
                        style={{ opacity: showIcon && isActive ? 1 : 0 }}
                        name="external_link"
                    />
                )}
                <Title disabled={!isActive}>{manifest.title}</Title>
            </ContentWrapper>
        </DItem>
    ) : (
        <MItem
            isLink={manifest.uri !== undefined}
            active={location.pathname.includes(`${appId}/${manifest.shortName}`)}
            title={isActive ? manifest.title : 'Disabled'}
            onClick={() => {
                manifest.uri ? window.open(manifest.uri) : navigate(getURL(manifest, appId));
                onClick && onClick();
            }}
            onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => setShowIcon(false)}
        >
            <ContentWrapper>
                {manifest.uri && (
                    <Icon size={16} style={{ opacity: showIcon ? 1 : 0 }} name="external_link" />
                )}
                <Title>{manifest.title}</Title>
            </ContentWrapper>
        </MItem>
    );
};
