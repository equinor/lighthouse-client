import { Icon, Search } from '@equinor/eds-core-react';
import { Case } from '@equinor/JSX-Switch';
import React, { useState } from 'react';
import { Switch } from '../../../../../../components/JSXSwitch/Components/Switch';
import { FilterClearIcon } from '../FilterClearIcon';
import { FilterController } from '../PowerBIFilter';
import { Container, SearchButton, Title } from './Styles';

type HeaderProps = {
    title: string;
    onSearch: (value: string | undefined) => void;
    searchEnabled: boolean;
    handleEnterPress: () => void;
    controller: FilterController;
    deselectAllValues: () => Promise<void>;
    hasActiveFilters: boolean;
};

export const Header = ({
    title,
    onSearch,
    searchEnabled,
    handleEnterPress,
    hasActiveFilters,
    deselectAllValues,
}: HeaderProps): JSX.Element => {
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
    return (
        <Container>
            <Switch>
                <Case when={isSearchActive}>
                    <Search
                        autoFocus={isSearchActive}
                        id="search-normal"
                        placeholder="Search"
                        aria-label="filter group"
                        onKeyPress={(e) => e.key === 'Enter' && handleEnterPress()}
                        onChange={(e) => onSearch(e.target.value)}
                        onBlur={() => {
                            setIsSearchActive(false);
                            onSearch(undefined);
                        }}
                    />
                </Case>
                <Case when={true}>
                    <Title hasActiveFilters={hasActiveFilters}>{title}</Title>
                    {searchEnabled && (
                        <SearchButton
                            onClick={() => setIsSearchActive((s) => !s)}
                            variant={'ghost_icon'}
                        >
                            <Icon id="search" name="search" />
                        </SearchButton>
                    )}
                    {hasActiveFilters && (
                        <FilterClearIcon
                            isDisabled={!hasActiveFilters}
                            onClick={deselectAllValues}
                        />
                    )}
                </Case>
            </Switch>
        </Container>
    );
};
