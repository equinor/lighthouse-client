import { Icon, Search } from '@equinor/eds-core-react';
import { Case, Switch } from '@equinor/JSX-Switch';
import { ChangeEvent, useCallback } from 'react';
import { FilterClearIcon } from '../../../FilterClearIcon';
import { useStore } from '../FilterItemsProvider';
import { Container, SearchButton, Title } from './Styles';

type HeaderProps = {
    title: string;
    searchEnabled: boolean;
    handleEnterPress: () => void;
    deselectAllValues: () => Promise<void>;
    hasActiveFilters: boolean;
};

export const Header = ({
    title,
    searchEnabled,
    handleEnterPress,
    hasActiveFilters,
    deselectAllValues,
}: HeaderProps): JSX.Element => {
    const [searchValue, setSearchValue] = useStore((store) => store.searchValue);
    const [isSearchActive, setIsSearchActive] = useStore((store) => store.isSearchActive);

    const handleSearchChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setSearchValue({ searchValue: e.target.value });
        },
        [setSearchValue]
    );

    const handleOnTitleClick = () => {
        searchEnabled && setIsSearchActive({ isSearchActive: true });
    };

    const handleOnSearchButtonClick = () => {
        setIsSearchActive({ isSearchActive: !isSearchActive });
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && handleEnterPress();
    };
    return (
        <Container>
            <Switch>
                <Case when={isSearchActive}>
                    <Search
                        autoFocus={isSearchActive}
                        id="search-normal"
                        placeholder="Search"
                        value={searchValue}
                        aria-label="filter group"
                        onKeyPress={handleKeyPress}
                        onChange={handleSearchChange}
                    />
                </Case>
                <Case when={true}>
                    <Title onClick={handleOnTitleClick} hasActiveFilters={hasActiveFilters}>
                        {title}
                    </Title>
                    {searchEnabled && (
                        <SearchButton onClick={handleOnSearchButtonClick} variant={'ghost_icon'}>
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
