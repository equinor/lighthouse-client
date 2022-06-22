import { Search } from '@equinor/eds-core-react';
import { useEffect, useRef, useState } from 'react';
import { ArrowNavigation } from 'react-arrow-navigation';
import { appsSearchMapper } from '../Config/Apps/appsSearchMapper';
import { AppSearchItem, appsSearchRequest } from '../Config/Apps/appsSearchRequest';
import { proCoSysSearchMapper } from '../Config/ProCoSys/proCoSysSearchMapper';
import { proCoSysSearchRequest } from '../Config/ProCoSys/proCoSysSearchRequest';
import { SearchResponse } from '../Config/ProCoSys/types';
import { useGlobalSearch } from '../Service/GlobalSearch';
import { SearchResult, Wrapper } from './GlobalSearchStyles';
import { SearchResultHeading } from './SearchResultHeading';
import { SearchResultItem } from './SearchResultItem';

export const GlobalSearch = (): JSX.Element => {
    const [searchInput, setSearchInput] = useState('');
    const searchRef = useRef<HTMLInputElement>(null);

    const { searchResult, search, registerSearchItem } = useGlobalSearch();

    useEffect(() => {
        const procosysSearchRegistration = registerSearchItem<SearchResponse>({
            type: 'procosys',
            searchRequest: proCoSysSearchRequest,
            searchMapper: proCoSysSearchMapper,
        });

        const appsRegistration = registerSearchItem<AppSearchItem>({
            type: 'apps',
            searchRequest: appsSearchRequest,
            searchMapper: appsSearchMapper,
        });

        return () => {
            procosysSearchRegistration();
            appsRegistration();
        };
    }, []);

    useEffect(() => {
        search(searchInput);
    }, [searchInput]);

    useEffect(() => {
        window.onkeydown = (ev: KeyboardEvent) => {
            if (ev.keyCode === 112) {
                ev.preventDefault();
                searchRef.current?.focus();
                setSearchInput('');
            }
        };
    }, []);

    // Used for keyboard navigation in search results.
    let keyNavigationIndex = 0;

    return (
        <Wrapper>
            <ArrowNavigation>
                <Search
                    ref={searchRef}
                    value={searchInput}
                    placeholder={'Press F1 to search..'}
                    onChange={(e) => {
                        setSearchInput(e.currentTarget.value);
                    }}
                ></Search>
                {search.length > 0 && (
                    <SearchResult>
                        <>
                            {searchResult.map((searchType) => (
                                <div key={searchType.type}>
                                    <SearchResultHeading
                                        typeTitle={searchType.title}
                                        color={searchType.color}
                                    />
                                    {searchType.items.map((item) => {
                                        keyNavigationIndex++;
                                        return (
                                            <SearchResultItem
                                                index={keyNavigationIndex}
                                                key={item.key}
                                                title={item.title}
                                                id={item.id}
                                                description={item.description}
                                                searchText={searchInput}
                                                action={(id: string) => {
                                                    searchType.action(id, item);
                                                    setSearchInput('');
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </>
                    </SearchResult>
                )}
            </ArrowNavigation>
        </Wrapper>
    );
};
