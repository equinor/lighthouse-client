import { Icon, Search } from '@equinor/eds-core-react';
import React, { useState } from 'react';
import { FilterClearIcon } from '../../../../../../Core/WorkSpace/src/Components/QuickFilter/Icons/FilterClear';
import { FilterController } from '../PowerBIFilter';
import { Container, SearchButton, Title } from './Styles';

type HeaderProps = {
    title: string;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
            {!isSearchActive && (
                <>
                    <Title>{title}</Title>
                    <FilterClearIcon isDisabled={!hasActiveFilters} onClick={deselectAllValues} />
                </>
            )}

            {isSearchActive && (
                <Search
                    id="search-normal"
                    placeholder="Search"
                    aria-label="filter group"
                    onKeyPress={(e) => e.key === 'Enter' && handleEnterPress()}
                    onChange={onSearch}
                />
            )}

            {searchEnabled && (
                <SearchButton onClick={() => setIsSearchActive((s) => !s)} variant={'ghost_icon'}>
                    {isSearchActive ? (
                        <Icon name="chevron_left" />
                    ) : (
                        <Icon id="search" name="search" />
                    )}
                </SearchButton>
            )}
        </Container>
    );
};
