import { Search } from '@equinor/eds-core-react';
import { httpClient, useFacility, useRegistry } from '@equinor/lighthouse-portal-client';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { searchApps } from '../Functions/searchApps';
import { searchMapper } from '../Functions/searchMapper';

import { ArrowNavigation } from 'react-arrow-navigation';
import { mapper } from '../Types/Mapper';
import { SearchItems } from '../Types/ProcoSysSearch';
import { SearchData } from '../Types/Search';
import { SearchResult, Wrapper } from './GlobalSearchStyles';
import { SearchResultHeading } from './SearchResultHeading';
import { SearchResultItem } from './SearchResultItem';
export const GlobalSearch = (): JSX.Element => {
    const [searchInput, setSearchInput] = useState('');
    const searchRef = useRef<HTMLInputElement>(null);
    const { apps } = useRegistry();
    const navigate = useNavigate();
    const [search, setSearch] = useState<SearchData[]>([]);
    const [appResult, setAppResult] = useState<
        { id: string; title: string; description: string; uri?: string; group: string }[]
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
            setAppResult([]);
            setSearch([]);
        }
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
                {(search.length > 0 || appResult.length > 0) && (
                    <SearchResult>
                        <>
                            {appResult.length > 0 && (
                                <>
                                    <SearchResultHeading typeTitle="App" color="blue" />
                                    {appResult.map((item) => {
                                        index++;
                                        return (
                                            <SearchResultItem
                                                index={index}
                                                key={item.id}
                                                title={item.title}
                                                id={item.id}
                                                description={item.description}
                                                searchText={searchInput}
                                                action={(id: string) => {
                                                    if (item.uri) {
                                                        window.open(item.uri, '_blank');
                                                        setSearchInput('');
                                                        return;
                                                    }
                                                    navigate(`${item.group}/${id}`);
                                                    setSearchInput('');
                                                }}
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
                                    {searchType.items.map((item: SearchItems) => {
                                        index++;
                                        return (
                                            <SearchResultItem
                                                index={index}
                                                key={item.key}
                                                title={item[mapper[searchType.type].title]}
                                                id={item[mapper[searchType.type].id]}
                                                description={
                                                    item[mapper[searchType.type].description]
                                                }
                                                searchText={searchInput}
                                                action={(id: string) => {
                                                    if (mapper[searchType.type].sideSheet) {
                                                        window.location.hash = `${
                                                            mapper[searchType.type].sideSheet
                                                        }/${id}`;
                                                    }
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
