import { Accordion } from '@equinor/eds-core-react';
import { useClientContext } from '@equinor/lighthouse-portal-client';
import { useMemo } from 'react';
import Icon from '../../../Icon/Icon';
import { useFavoritesContext } from '../../Context/FavoritesContext';
import { useMenuContext } from '../../Context/MenuContext';
import { MenuItem } from '../MenuItem/MenuItem';
import { FavoriteHeader, FavoritePanel, HeaderIconWrapper } from './FavouritesStyles';

const { Item } = Accordion;
export const Favorites = (): JSX.Element => {
    const { favorites } = useFavoritesContext();
    const {
        registry: { apps },
    } = useClientContext();

    const filteredFavorites = useMemo(
        () => apps.filter((app) => favorites.includes(app.shortName)),
        [apps, favorites]
    );

    const { favoritesExpanded, setFavoritesExpanded } = useMenuContext();

    return (
        <Accordion chevronPosition="right">
            <Item
                isExpanded={favoritesExpanded}
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    e.preventDefault();
                    setFavoritesExpanded(!favoritesExpanded);
                }}
            >
                <FavoriteHeader>
                    <HeaderIconWrapper>
                        <Icon name="star_filled" />
                    </HeaderIconWrapper>
                    Favorites
                </FavoriteHeader>
                <FavoritePanel>
                    {filteredFavorites.length > 0 ? (
                        filteredFavorites.map((manifest) => {
                            const group =
                                typeof manifest.groupe === 'string'
                                    ? manifest.groupe
                                    : manifest.groupe[0];
                            return (
                                <MenuItem
                                    key={`acc-${manifest.shortName}`}
                                    groupId={group}
                                    manifest={manifest}
                                />
                            );
                        })
                    ) : (
                        <p>You have no favorites Selected.</p>
                    )}
                </FavoritePanel>
            </Item>
        </Accordion>
    );
};
