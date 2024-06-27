import { isAppActive, isProduction } from '@equinor/lighthouse-portal-client';
import { useMemo, useState } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
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

export const MenuItem = ({ manifest, groupId, onClick }: MenuItemProps): JSX.Element | null => {
  const [showIcon, setShowIcon] = useState(false);
  const { toggleFavorite, hasFavorite } = useFavoritesContext();

  const { pathname } = useLocation();

  const isActive = useMemo(() => isAppActive(manifest), [manifest]);

  const activePath = matchPath(`/${groupId}/${manifest.shortName}/*`, pathname);
  if (!isActive) return null;

  return (
    <Item
      isLink={manifest.uri !== undefined}
      active={activePath !== null}
      title={isActive ? manifest.title : 'Disabled'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        manifest.uri
          ? window.open(manifest.uri(isProduction()))
          : window.location.href = (getURL(manifest, groupId));
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
              style={{
                opacity: hasFavorite(manifest.shortName) || (showIcon && isActive) ? 1 : 0,
              }}
              name={hasFavorite(manifest.shortName) ? 'star_filled' : 'star_outlined'}
            />
          </IconButton>
        </div>
      </ContentWrapper>
    </Item>
  );
};
