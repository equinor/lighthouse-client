import { Icon, Search } from '@equinor/eds-core-react';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const Title = styled.div`
    font-weight: 600;
`;

type HeaderProps = {
    title: string;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const Header = ({ title, onSearch }: HeaderProps) => {
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
            <Icon
                name={isSearchActive ? 'chevron_right' : 'search'}
                onClick={() => setIsSearchActive(!isSearchActive)}
                size={24}
            />
        </Container>
    );
};
