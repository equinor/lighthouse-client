import { DotProgress } from '@equinor/eds-core-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowNavigation } from 'react-arrow-navigation';
import { useNavigate } from 'react-router';
import { appsConfig } from '../Config/Apps';
import { procosysConfig } from '../Config/ProCoSys';
import { SearchResponse } from '../Config/ProCoSys/types';
import { useGlobalSearch } from '../Service/GlobalSearch';
import { SearchItem } from '../Service/SearchApi';
import { NoResult, Search, SearchResult, Wrapper } from './GlobalSearchStyles';
import { SearchResultHeading } from './SearchResultHeading';
import { SearchResultItem } from './SearchResultItem';

const SEARCH_FOCUS = 'Type to search...';
const SEARCH_BLUR = 'Press F1 to search';

export const GlobalSearch = (): JSX.Element => {
    const [searchInput, setSearchInput] = useState('');
    const [placeHolderText, setPlaceholderText] = useState(SEARCH_BLUR);
    const searchRef = useRef<HTMLInputElement>(null);
    const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(false);

    function handleSetNavigation(value: boolean) {
        setIsNavigationOpen(value);
    }

    const navigate = useNavigate();

    const { searchResult, search, isSearching, registerSearchItem } = useGlobalSearch();

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
        <Wrapper
            hasFocus={placeHolderText == SEARCH_FOCUS || searchInput.length > 0}
            title={placeHolderText}
        >
            <ArrowNavigation>
                <Search
                    ref={searchRef}
                    value={searchInput}
                    placeholder={placeHolderText}
                    onFocus={() => setPlaceholderText(SEARCH_FOCUS)}
                    onBlur={() => setPlaceholderText(SEARCH_BLUR)}
                    isSearching={isSearching}
                    onChange={(e) => {
                        setSearchInput(e.currentTarget.value);
                    }}
                ></Search>
                {isSearching && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <DotProgress color="primary" />
                    </div>
                )}
                {searchInput.length > 0 && search.length > 0 && (
                    <SearchResult>
                        {searchResult.length > 0 ? (
                            <>
                                {searchResult.map((searchType) => (
                                    <div key={searchType.type}>
                                        <SearchResultHeading
                                            typeTitle={searchType.title}
                                            color={searchType.color}
                                        />
                                        {searchType.items.slice(0, 5).map((item) => {
                                            keyNavigationIndex++;
                                            return (
                                                <SearchResultItem
                                                    isNavigationOpen={isNavigationOpen}
                                                    handleNavigationOpen={handleSetNavigation}
                                                    index={keyNavigationIndex}
                                                    {...searchType}
                                                    {...item}
                                                    key={item.key}
                                                    description={item.description}
                                                    searchText={searchInput}
                                                    shouldHighlightDescription={!item.group}
                                                    appAction={
                                                        searchType.appAction
                                                            ? (id: string) => {
                                                                  searchType.appAction &&
                                                                      searchType.appAction(
                                                                          id,
                                                                          navigate
                                                                      );
                                                                  setSearchInput('');
                                                              }
                                                            : undefined
                                                    }
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
                        ) : (
                            !isSearching && (
                                <NoResult>Sorry, Could not find what you are looking for.</NoResult>
                            )
                        )}
                    </SearchResult>
                )}
            </ArrowNavigation>
        </Wrapper>
    );
};
