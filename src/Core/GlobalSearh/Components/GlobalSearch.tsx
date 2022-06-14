import { Search } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import { httpClient } from '../../Client/Functions';
import { useFacility } from '../../Client/Hooks';
import { SearchItem } from '../Types/Search';
import { SearchResult, Wrapper } from './GlobalSearchStyles';
import { SearchResultHeading } from './SearchResultHeading';
import { SearchResultItem } from './SearchResultItem';

export const GlobalSearch = (): JSX.Element => {
    const [searchInput, setSearchInput] = useState('');
    const [result, setResult] = useState<SearchItem[]>([]);
    const { customHttpClient } = httpClient({
        scope: 'api://195ed58a-9cb8-4d93-9e37-9ad315032baf/ReadWrite',
    });
    const { procosysPlantId } = useFacility();

    useEffect(() => {
        if (searchInput.length > 0) {
            customHttpClient
                .fetch(`https://search-dev.pcs-dev.net/Search?query=${searchInput}&preview=true`)
                .then((result) =>
                    result.json().then((data) => {
                        console.log(data.items);
                        setResult(data.items);
                    })
                );
        }
    }, [customHttpClient, searchInput]);

    return (
        <Wrapper>
            <Search
                value={searchInput}
                onChange={(e) => {
                    setSearchInput(e.currentTarget.value);
                }}
            ></Search>
            <SearchResult>
                <SearchResultHeading typeTitle="Tag" color="red" />
                {result.map((item) => {
                    if (item.tag) {
                        return (
                            <SearchResultItem
                                title={item.tag.tagNo}
                                description={item.tag.description}
                            />
                        );
                    }
                })}
            </SearchResult>
        </Wrapper>
    );
};
