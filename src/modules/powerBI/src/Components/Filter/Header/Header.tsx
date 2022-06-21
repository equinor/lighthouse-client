import { Icon, Search } from '@equinor/eds-core-react';
import React, { useState } from 'react';
import { Container, SearchButton, Title } from './Styles';

type HeaderProps = {
    title: string;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchEnabled: boolean;
    handleEnterPress: () => void;
};

export const Header = ({
    title,
    onSearch,
    searchEnabled,
    handleEnterPress,
}: HeaderProps): JSX.Element => {
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
    return (
        <Container>
            {!isSearchActive && <Title>{title}</Title>}

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
