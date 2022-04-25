import { Icon, Search } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useFilterApiContext } from '../../../../../packages/Filter/Hooks/useFilterApiContext';
import { TabButton } from '../ToggleButton';

/** Search button for searching data in workspace */
export function SearchButton(): JSX.Element {
    const {
        search: { clearSearch, search },
        filterState: { getAllFilterGroups },
    } = useFilterApiContext();

    const [isActive, setIsActive] = useState(false);
    const handleChange = () =>
        setIsActive((prev) => {
            if (prev === false) {
                clearSearch();
            }
            return !prev;
        });

    function handleSearch(e) {
        const value = e.target.value;

        value === ''
            ? clearSearch()
            : search(
                  getAllFilterGroups().map(({ name }) => name),
                  value,
                  'FilteredData'
              );
    }

    function handleClear(e) {
        e.isTrusted ? void 0 : clearSearch();
    }

    return (
        <>
            <TabButton aria-selected={false} onClick={handleChange}>
                <Icon name="search" />
            </TabButton>
            {isActive && (
                <Search
                    onChange={handleClear}
                    placeholder="Type to search..."
                    onInput={handleSearch}
                />
            )}
        </>
    );
}
