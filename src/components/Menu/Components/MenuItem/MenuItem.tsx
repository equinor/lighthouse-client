import { isAppActive } from '@equinor/portal-client';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppManifest } from '../../../../Core/Client/Types';
import { getURL } from '../../utils';
import { ContentWrapper, Item, MenuItemIcon, Title } from './MenuItemStyles';

interface MenuItemProps {
    manifest: AppManifest;
    appId: string;
    onClick?: () => void;
}

export const MenuItem = ({ manifest, appId, onClick }: MenuItemProps): JSX.Element => {
    const navigate = useNavigate();
    const [showIcon, setShowIcon] = useState(false);
    const isActive = useMemo(() => isAppActive(manifest), [manifest]);

    return (
        <Item
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
                <Title disabled={!isActive}>{manifest.title}</Title>
                {manifest.uri && (
                    <MenuItemIcon
                        size={16}
                        style={{ opacity: showIcon && isActive ? 1 : 0 }}
                        name="external_link"
                    />
                )}
            </ContentWrapper>
        </Item>
    );
};
