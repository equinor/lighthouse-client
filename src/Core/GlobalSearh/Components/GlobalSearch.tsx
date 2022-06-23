import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowNavigation } from 'react-arrow-navigation';
import { useNavigate } from 'react-router';
import { appsConfig } from '../Config/Apps';
import { procosysConfig } from '../Config/ProCoSys';
import { SearchResponse } from '../Config/ProCoSys/types';
import { useGlobalSearch } from '../Service/GlobalSearch';
import { SearchItem } from '../Service/SearchApi';
import { Search, SearchResult, Wrapper } from './GlobalSearchStyles';
import { SearchResultHeading } from './SearchResultHeading';
import { SearchResultItem } from './SearchResultItem';

const SEARCH_FOCUS = 'Type to search...';
const SEARCH_BLUR = 'Press F1 to search';

export const GlobalSearch = (): JSX.Element => {
    const [searchInput, setSearchInput] = useState('');
    const [placeHolderText, setPlaceholderText] = useState(SEARCH_BLUR);
    const searchRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const { searchResult, search, registerSearchItem } = useGlobalSearch();

    useEffect(() => {
        const procosysSearchRegistration = registerSearchItem<SearchResponse>(procosysConfig);
        const appsRegistration = registerSearchItem<SearchItem>(appsConfig);
        return () => {
            procosysSearchRegistration();
            appsRegistration();
        };
    }, []);

    useEffect(() => {
        search(searchInput);
    }, [searchInput]);

    const f1KeyDownEvent = useCallback((ev: KeyboardEvent) => {
        if (ev.keyCode === 112) {
            ev.preventDefault();
            searchRef.current?.focus();
            setSearchInput('');
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', f1KeyDownEvent);
        return () => {
            window.removeEventListener('keydown', f1KeyDownEvent);
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
                    placeholder={placeHolderText}
                    onFocus={() => setPlaceholderText(SEARCH_FOCUS)}
                    onBlur={() => setPlaceholderText(SEARCH_BLUR)}
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
                                                    searchType.action(id, item, navigate);
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