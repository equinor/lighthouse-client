import { Search as EdsSearch } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import styled from 'styled-components';
import { useFilterApiContext } from '../../../../../packages/Filter/Hooks/useFilterApiContext';
import { useWorkSpace } from '../../WorkSpaceApi/useWorkSpace';
import { SearchPickerDropdown } from './SearchPickerDropdown';
import { getPlaceholderText } from './Utils/getSearchPlaceholderText';

export type SearchMode = 'id/desc' | 'all';

export const FilterQuickSearch = (): JSX.Element => {
    const {
        search: { search, clearSearch },
        filterState,
    } = useFilterApiContext();
    const [searchText, setSearchText] = useState<string | undefined>();

    const { searchOptions = [] } = useWorkSpace();

    const [searchMode, setSearchMode] = useState<SearchMode>('id/desc');

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
                valueFormatters:
                    searchMode === 'all'
                        ? [...filterState.getValueFormatters(), ...searchOptions]
                        : searchOptions,
            });
        }
    }
    return (
        <>
            <Search
                size={50}
                onChange={handleClear}
                placeholder={getPlaceholderText(searchMode)}
                onInput={handleInput}
                value={searchText}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        searchText && doSearch(searchText);
                    }
                }}
            />
            <SearchPickerDropdown
                menuItems={[
                    { title: 'Id and title', onCLick: () => setSearchMode('id/desc') },
                    { title: 'All', onCLick: () => setSearchMode('all') },
                ]}
            />
        </>
    );
};

export const Search = styled(EdsSearch)`
    background: ${tokens.colors.ui.background__light.rgba};

    :focus-within {
        background: ${tokens.colors.ui.background__default.rgba};
    }
`;
