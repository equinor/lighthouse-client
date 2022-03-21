import { Search } from '@equinor/eds-core-react';
import { useClientContext } from '@equinor/portal-client';
import { useMemo, useState } from 'react';
import {
    FullscreenMenuAppGroup,
    FullscreenMenuGroupHeaderText,
    FullscreenMenuWrapper,
    HeaderLink,
    MenuColumn,
    MenuRow,
    MenuScrim
} from './FullscreenMainMenuStyles';
import { MenuItem } from './MenuItem';
import { filterByValue, groupeByKey } from './utils';

export const FullscreenMainMenu = (): JSX.Element => {
    const [searchValue, setSearchValue] = useState('');
    const { registry, toggleFullscreenMenu } = useClientContext();

    const { apps, appGroups } = registry;
    const GroupedMenu = useMemo(() => groupeByKey(apps, 'groupe'), [apps]);

    const filteredList = filterByValue(GroupedMenu, searchValue, 'title');

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);
    };

    const appColumn = (columnId: number) =>
        Object.keys(filteredList).map((key) => {
            if (key === 'Top' || appGroups[key].columnId !== columnId) {
                return null;
            }
            return (
                <FullscreenMenuAppGroup key={key}>
                    <HeaderLink
                        to={`${key}`}
                        className="noBorder"
                        onClick={() => toggleFullscreenMenu()}
                    >
                        <FullscreenMenuGroupHeaderText>
                            {appGroups[key].name}
                        </FullscreenMenuGroupHeaderText>
                    </HeaderLink>

                    {filteredList[key].map((item) => {
                        return (
                            <MenuItem
                                key={`acc-${item.shortName}`}
                                appId={key}
                                manifest={item}
                                isFullMenu={true}
                                onClick={() => toggleFullscreenMenu()}
                            />
                        );
                    })}
                </FullscreenMenuAppGroup>
            );
        });

    return (
        <MenuScrim onClick={() => toggleFullscreenMenu()}>
            <FullscreenMenuWrapper>
                <MenuRow>
                    <Search
                        aria-label="sitewide"
                        id="search-normal"
                        placeholder="Search"
                        onChange={handleOnChange}
                    />
                </MenuRow>
                <MenuRow>
                    <MenuColumn>{appColumn(1)}</MenuColumn>
                    <MenuColumn>{appColumn(2)}</MenuColumn>
                    <MenuColumn>{appColumn(3)}</MenuColumn>
                    <MenuColumn>{appColumn(4)}</MenuColumn>
                </MenuRow>
            </FullscreenMenuWrapper>
        </MenuScrim>
    );
};
