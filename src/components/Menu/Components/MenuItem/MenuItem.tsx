import { isAppActive, isProduction } from '@equinor/portal-client';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppManifest } from '../../../../Core/Client/Types';
import Icon from '../../../Icon/Icon';
import { useFavoritesContext } from '../../Context/FavoritesContext';
import { getURL } from '../../Utils/utils';
import { Item } from '../Sheard/Styles';
import { ContentWrapper, IconButton, Title } from './MenuItemStyles';

interface MenuItemProps {
    manifest: AppManifest;
    groupId: string;
    onClick?: () => void;
}

export const MenuItem = ({ manifest, groupId, onClick }: MenuItemProps): JSX.Element => {
    const { toggleFavorite, hasFavorite } = useFavoritesContext();
    const navigate = useNavigate();
    const [showIcon, setShowIcon] = useState(false);
    const isActive = useMemo(() => isAppActive(manifest), [manifest]);

    return (
        <Item
            isLink={manifest.uri !== undefined}
            active={location.pathname.includes(`${groupId}/${manifest.shortName}`)}
            title={isActive ? manifest.title : 'Disabled'}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                manifest.uri
                    ? window.open(manifest.uri(isProduction()))
                    : navigate(getURL(manifest, groupId));
                onClick && onClick();
            }}
            onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => setShowIcon(false)}
            disabled={!isActive}
        >
            <ContentWrapper>
                <Title disabled={!isActive}>{manifest.title}</Title>
                <div>
                    {manifest.uri && (
                        <IconButton>
                            <Icon
                                size={16}
                                style={{ opacity: showIcon && isActive ? 1 : 0 }}
                                name="external_link"
                            />
                        </IconButton>
                    )}
                    <IconButton
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(manifest.shortName);
                        }}
                    >
                        <Icon
                            size={16}
                            style={{ opacity: showIcon && isActive ? 1 : 0 }}
                            name={hasFavorite(manifest.shortName) ? 'star_filled' : 'star_outlined'}
                        />
                    </IconButton>
                </div>
            </ContentWrapper>
        </Item>
    );
};
