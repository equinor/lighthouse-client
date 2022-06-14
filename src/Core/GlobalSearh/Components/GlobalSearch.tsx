import { Search } from '@equinor/eds-core-react';
import { httpClient, useFacility, useRegistry } from '@equinor/lighthouse-portal-client';
import { useEffect, useState } from 'react';
import { searchApps } from '../Functions/searchApps';
import { searchMapper } from '../Functions/searchMapper';

import { mapper } from '../Types/Mapper';
import { SearchItem, SearchItems } from '../Types/Search';
import { SearchResult, Wrapper } from './GlobalSearchStyles';
import { SearchResultHeading } from './SearchResultHeading';
import { SearchResultItem } from './SearchResultItem';

export const GlobalSearch = (): JSX.Element => {
    const [searchInput, setSearchInput] = useState('');
    const { apps } = useRegistry();
    const [search, setSearch] = useState<SearchItem[]>([]);
    const [appResult, setAppResult] = useState<
        { id: string; title: string; description: string }[]
    >([]);
    const { customHttpClient } = httpClient({
        scope: 'api://195ed58a-9cb8-4d93-9e37-9ad315032baf/ReadWrite',
    });
    const { procosysPlantId } = useFacility();

    useEffect(() => {
        if (searchInput.length > 0) {
            customHttpClient
                .fetch(
                    `https://search-test.pcs-dev.net/Search?query=${searchInput}&preview=true&plant=${procosysPlantId}`
                )
                .then((result) => {
                    if (result.ok) {
                        result.json().then((data) => {
                            setSearch(searchMapper(data));
                        });
                    }
                })
                .catch((e) => console.log(e));
            setAppResult(searchApps(apps, searchInput));
        } else {
            setSearch([]);
            setAppResult([]);
        }
    }, [searchInput]);

    return (
        <Wrapper>
            <Search
                value={searchInput}
                onChange={(e) => {
                    setSearchInput(e.currentTarget.value);
                }}
            ></Search>
            {(search.length > 0 || appResult.length > 0) && (
                <SearchResult>
                    <>
                        {appResult.length > 0 && (
                            <>
                                <SearchResultHeading typeTitle="App" color="blue" />
                                {appResult.map((item) => {
                                    return (
                                        <SearchResultItem
                                            key={item.id}
                                            title={item.title}
                                            id={item.id}
                                            description={item.description}
                                            searchText={searchInput}
                                        />
                                    );
                                })}
                            </>
                        )}
                        {search.map((searchType) => (
                            <div key={searchType.type}>
                                <SearchResultHeading
                                    typeTitle={searchType.title}
                                    color={searchType.color}
                                />
                                {searchType.items.map((item: SearchItems) => (
                                    <SearchResultItem
                                        key={item.key}
                                        title={item[mapper[searchType.type].title]}
                                        id={item[mapper[searchType.type].id]}
                                        description={item[mapper[searchType.type].description]}
                                        searchText={searchInput}
                                    />
                                ))}
                            </div>
                        ))}
                    </>
                </SearchResult>
            )}
        </Wrapper>
    );
};
