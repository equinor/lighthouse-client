import { Search } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useFilterApiContext } from '../../../../../packages/Filter/Hooks/useFilterApiContext';
import { useWorkSpace } from '../../WorkSpaceApi/useWorkSpace';

export const FilterQuickSearch = (): JSX.Element => {
    const {
        search: { search, clearSearch },
        filterState,
    } = useFilterApiContext();
    const [searchText, setSearchText] = useState<string | undefined>();

    const { searchOptions = [] } = useWorkSpace();

    function handleClear(e) {
        if (!e.isTrusted) {
            setSearchText(undefined);
            clearSearch();
        }
    }
    function handleInput(e) {
        const value = e.target.value;
        if (!value) clearSearch();
        setSearchText(value);
    }
    function doSearch(value: string) {
        if (value === '') {
            clearSearch();
        } else {
            search({
                searchValue: value,
                searchIn: 'FilteredData',
                type: 'includes',
                valueFormatters: [...filterState.getValueFormatters(), ...searchOptions],
            });
        }
    }
    return (
        <Search
            onChange={handleClear}
            placeholder={`Search`}
            onInput={handleInput}
            value={searchText}
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    searchText && doSearch(searchText);
                }
            }}
        />
    );
};
