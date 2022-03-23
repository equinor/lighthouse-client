import { Accordion } from '@equinor/eds-core-react';
import { useClientContext } from '@equinor/portal-client';
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

    const { activeGroupe } = useMenuContext();

    const filteredFavorites = useMemo(
        () => apps.filter((app) => favorites.includes(app.shortName)),
        [apps, favorites]
    );

    return (
        <Accordion chevronPosition="right">
            <Item>
                <FavoriteHeader>
                    <HeaderIconWrapper>
                        <Icon name="star_filled" />
                    </HeaderIconWrapper>
                    Favorites
                </FavoriteHeader>
                <FavoritePanel>
                    {filteredFavorites.length > 0 ? (
                        filteredFavorites.map((manifest) => (
                            <MenuItem
                                key={`acc-${manifest.shortName}`}
                                groupId={activeGroupe}
                                manifest={manifest}
                            />
                        ))
                    ) : (
                        <p>You have no favorites Selected.</p>
                    )}
                </FavoritePanel>
            </Item>
        </Accordion>
    );
};
