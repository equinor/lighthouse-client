import { Button, Divider } from '@equinor/eds-core-react';
import { useClientContext } from '@equinor/portal-client';
import { useMemo } from 'react';
import Icon from '../../../Icon/Icon';
import { useMenuContext } from '../../Context/MenuContext';
import { groupeByKey } from '../../utils';
import { Favorites } from '../Favourites/Favourites';
import { GroupItem } from '../GroupeItem/GroupeItem';
import { MenuItem } from '../MenuItem/MenuItem';
import { MenuWrapper } from './CompactMenuStyles';

export const CompactMenu = (): JSX.Element => {
    const {
        // settings: { appsPanelActive },
        registry,
    } = useClientContext();

    const { apps, appGroups } = registry;

    const { setExpandMenuActive, setActiveGroupe, activeGroupe } = useMenuContext();
    // const [searchValue, setSearchValue] = useState('');

    // const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target.value;
    //     setSearchValue(value);
    // };

    const GroupedMenu = useMemo(() => groupeByKey(apps, 'groupe'), [apps]);

    // const anchorRef = useRef<HTMLHeadingElement[]>([]);

    // const [isOpen, setIsOpen] = useState<string>('');
    // const openPopover = (type: string) => setIsOpen(type);
    // const closePopover = () => setIsOpen('');
    // const handleClose = () => {
    //     closePopover();
    // };

    // const filteredList = filterByValue(GroupedMenu, searchValue, 'title');
    // const isExpanded = searchValue.length > 1 ? true : false;

    return (
        <MenuWrapper>
            <div>
                <Favorites />
                <Divider />
            </div>
            <div>
                {activeGroupe === '' ? (
                    <div>
                        {Object.keys(appGroups).map((key) => {
                            return (
                                <GroupItem
                                    key={`item-${key}`}
                                    appGroup={appGroups[key]}
                                    onClick={() => {
                                        setActiveGroupe(key);
                                    }}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <Button variant="ghost" onClick={() => setActiveGroupe('')}>
                            {appGroups[activeGroupe].name}
                        </Button>
                        {GroupedMenu[activeGroupe].map((manifest) => (
                            <MenuItem
                                key={`acc-${manifest.shortName}`}
                                appId={activeGroupe}
                                manifest={manifest}
                            />
                        ))}
                    </div>
                )}
            </div>
            <Button variant="ghost" onClick={setExpandMenuActive}>
                Expanded menu
                <Icon name="chevron_right" />
            </Button>
        </MenuWrapper>
    );
};
