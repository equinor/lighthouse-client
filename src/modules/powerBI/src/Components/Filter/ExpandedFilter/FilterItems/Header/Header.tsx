import { Icon, Search } from '@equinor/eds-core-react';
import { Case, Switch } from '@equinor/JSX-Switch';
import { useState } from 'react';
import { FilterClearIcon } from '../../../FilterClearIcon';
import { Container, SearchButton, Title } from './Styles';

type HeaderProps = {
    title: string;
    onSearch: (value: string | undefined) => void;
    searchEnabled: boolean;
    handleEnterPress: () => void;
    deselectAllValues: () => Promise<void>;
    hasActiveFilters: boolean;
    searchValue: string | undefined;
};

export const Header = ({
    title,
    onSearch,
    searchEnabled,
    handleEnterPress,
    searchValue,
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
                        style={{
                            width: '150px',
                        }}
                        id="search-normal"
                        placeholder="Search"
                        value={searchValue}
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
                    <Title
                        onClick={() => searchEnabled && setIsSearchActive(true)}
                        hasActiveFilters={hasActiveFilters}
                    >
                        {title}
                    </Title>
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
