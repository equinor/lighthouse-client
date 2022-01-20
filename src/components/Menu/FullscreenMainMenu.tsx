import { Search } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { isProduction, useClientContext } from '@equinor/portal-client';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import {
    FullscreenMenuAppColumn,
    FullscreenMenuAppGroup,
    FullscreenMenuGroupHeaderLink,
    FullscreenMenuGroupHeaderText,
    FullscreenMenuItems,
    FullscreenMenuItemText,
    FullscreenMenuWrapper,
    FullscreenSearchWrapper,
    MenuItem,
    Title
} from './Styles';
import { filterByValue, groupeByKey } from './utils';

export const FullscreenMainMenu = (): JSX.Element => {
    const isProd = isProduction();
    const [searchValue, setSearchValue] = useState('');
    const { settings, registry, toggleAppPanel, toggleFullscreenMenu } = useClientContext();

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
            const CustomIcon = appGroups[key].icon;
            return (
                <FullscreenMenuAppGroup key={key}>
                    <FullscreenMenuGroupHeaderLink
                        to={`${key}`}
                        className="noBorder"
                        onClick={() => toggleFullscreenMenu()}
                    >
                        {CustomIcon && typeof CustomIcon !== 'string' && <CustomIcon />}
                        {CustomIcon && typeof CustomIcon === 'string' && (
                            <Icon
                                name={CustomIcon}
                                title={appGroups[key].name}
                                color={tokens.colors.text.static_icons__secondary.rgba}
                            />
                        )}
                        <FullscreenMenuGroupHeaderText>
                            {appGroups[key].name}
                        </FullscreenMenuGroupHeaderText>
                    </FullscreenMenuGroupHeaderLink>
                    <div className="noBorder">
                        {filteredList[key].map((item) => (
                            <Link
                                className="link"
                                key={`link-${item.shortName}`}
                                to={`${key}/${item.shortName}`}
                                onClick={() => toggleFullscreenMenu()}
                                title={!item.isProduction && isProd ? 'Disabled' : item.title}
                                style={!item.isProduction && isProd ? { color: '#e3e3e3' } : {}}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </FullscreenMenuAppGroup>
            );
        });

    return (
        <FullscreenMenuWrapper>
            <FullscreenSearchWrapper>
                <Search
                    aria-label="sitewide"
                    id="search-normal"
                    placeholder="Search"
                    onChange={handleOnChange}
                />
            </FullscreenSearchWrapper>
            <FullscreenMenuAppColumn>{appColumn(1)}</FullscreenMenuAppColumn>
            <FullscreenMenuAppColumn>{appColumn(2)}</FullscreenMenuAppColumn>
            <FullscreenMenuAppColumn>{appColumn(3)}</FullscreenMenuAppColumn>
            <FullscreenMenuAppColumn>{appColumn(4)}</FullscreenMenuAppColumn>

            <FullscreenMenuItems>
                <Title className="noBorder">
                    <Icon name={'fullscreen'} title={'Menu'} color={'#007079'} />
                    <FullscreenMenuGroupHeaderText style={{ cursor: 'default' }}>
                        Menu
                    </FullscreenMenuGroupHeaderText>
                </Title>
                <MenuItem
                    onClick={() => {
                        settings.appsPanelActive ? toggleAppPanel() : null;
                        toggleFullscreenMenu();
                    }}
                >
                    <FullscreenMenuItemText>Minimized</FullscreenMenuItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        !settings.appsPanelActive ? toggleAppPanel() : null;
                        toggleFullscreenMenu();
                    }}
                >
                    <FullscreenMenuItemText>Standard</FullscreenMenuItemText>
                </MenuItem>
                <MenuItem>
                    <FullscreenMenuItemText disabled={true}>Expand all</FullscreenMenuItemText>
                </MenuItem>
            </FullscreenMenuItems>
        </FullscreenMenuWrapper>
    );
};
