import { Accordion } from '@equinor/eds-core-react';
import { apps } from '@equinor/eds-icons';
import { useClientContext } from '@equinor/portal-client';
import { useMemo, useState } from 'react';
import { useMenuContext } from '../../Context/MenuContext';
import { MenuItem } from '../MenuItem/MenuItem';
import { FavoriteHeader, FavoritePanel, HeaderIcon } from './FavouritesStyles';

const { Item } = Accordion;
export const Favorites = (): JSX.Element => {
    const [favoritesIds, setFavoriteIds] = useState<string[]>(['construction', 'commissioning']);
    const { registry } = useClientContext();

    const { activeGroupe } = useMenuContext();

    const favorites = useMemo(
        () => registry.apps.filter((app) => favoritesIds.includes(app.shortName)),
        [apps, favoritesIds]
    );

    return (
        <Accordion chevronPosition="right">
            <Item>
                <FavoriteHeader>
                    <HeaderIcon name="star_filled" />
                    Favorites
                </FavoriteHeader>
                <FavoritePanel>
                    {favorites.map((manifest) => (
                        <MenuItem
                            key={`acc-${manifest.shortName}`}
                            appId={activeGroupe}
                            manifest={manifest}
                        />
                    ))}
                </FavoritePanel>
            </Item>
        </Accordion>
    );
};
