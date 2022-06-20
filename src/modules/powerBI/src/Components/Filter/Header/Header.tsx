import { Icon, Search } from '@equinor/eds-core-react';
import React, { useState } from 'react';
import { Container, SearchButton, Title } from './Styles';

type HeaderProps = {
    title: string;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchEnabled: boolean;
};
export const Header = ({ title, onSearch, searchEnabled }: HeaderProps): JSX.Element => {
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
    return (
        <Container>
            {!isSearchActive && <Title>{title}</Title>}

            {isSearchActive && (
                <Search
                    id="search-normal"
                    placeholder="Search"
                    aria-label="filter group"
                    onChange={onSearch}
                />
            )}
            {searchEnabled && (
                <SearchButton
                    variant="ghost_icon"
                    onClick={() => setIsSearchActive(!isSearchActive)}
                >
                    <Icon name={isSearchActive ? 'chevron_right' : 'search'} size={24} />
                </SearchButton>
            )}
        </Container>
    );
};
