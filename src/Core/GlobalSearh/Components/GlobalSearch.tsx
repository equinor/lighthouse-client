import { Search } from '@equinor/eds-core-react';
import { getClientContext, httpClient, useRegistry } from '@equinor/lighthouse-portal-client';
import { useEffect, useRef, useState } from 'react';
import { AppSearchItem, searchApps } from '../Functions/searchApps';
import { searchMapper } from '../Functions/searchMapper';

import { tokens } from '@equinor/eds-tokens';
import { ArrowNavigation } from 'react-arrow-navigation';
import { useNavigate } from 'react-router';
import { useGlobalSearch } from '../Service/GlobalSearch';
import { SearchItem } from '../Service/SearchApi';
import { SearchResponse } from '../Types/ProcoSysSearch';
import { SearchResult, Wrapper } from './GlobalSearchStyles';
import { SearchResultHeading } from './SearchResultHeading';
import { SearchResultItem } from './SearchResultItem';

export const GlobalSearch = (): JSX.Element => {
    const [searchInput, setSearchInput] = useState('');
    const searchRef = useRef<HTMLInputElement>(null);
    const { apps } = useRegistry();
    const navigate = useNavigate();

    const { customHttpClient } = httpClient({
        scope: 'api://195ed58a-9cb8-4d93-9e37-9ad315032baf/ReadWrite',
    });
    // const { procosysPlantId } = useFacility();
    const { searchResult, search, registerSearchItem } = useGlobalSearch();

    useEffect(() => {
        const procosysSearchRegistration = registerSearchItem<SearchResponse>({
            type: 'procosys',
            searchRequest: async (searchText: string) => {
                const { procosysPlantId } = getClientContext();
                try {
                    const result = await customHttpClient.fetch(
                        `https://search-test.pcs-dev.net/Search?query=${searchText}&preview=true&plant=${procosysPlantId}`
                    );
                    if (result.ok) {
                        return result.json();
                    }
                    throw 'No content';
                } catch (error) {
                    console.error(error);
                }
            },
            searchMapper: (data) => {
                if (!Array.isArray(data)) {
                    return searchMapper(data);
                }
                return [];
            },
        });

        const appsRegistration = registerSearchItem<AppSearchItem>({
            type: 'apps',
            searchRequest: (searchText: string) => searchApps(apps, searchText),
            searchMapper: (data) =>
                Array.isArray(data) && data.length > 0
                    ? {
                          type: 'apps',
                          title: 'Application',
                          color: tokens.colors.interactive.success__resting.rgba,
                          action: (id: string, item: SearchItem) => {
                              if (item.uri) {
                                  window.open(item.uri, '_blank');
                                  setSearchInput('');
                                  return;
                              }
                              navigate(`${item.group}/${id}`);
                          },
                          items: data,
                      }
                    : [],
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

    let index = 0;

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
                                        index++;
                                        return (
                                            <SearchResultItem
                                                index={index}
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
