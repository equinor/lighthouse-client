import { Menu, Search } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useRef, useState } from 'react';
import { ClickableIcon } from '../../../../../packages/Components/Icon';
import { useFilterApiContext } from '../../../../../packages/Filter/Hooks/useFilterApiContext';
import { useWorkSpace } from '../../WorkSpaceApi/useWorkSpace';

type SearchMode = 'id/desc' | 'all';

export const FilterQuickSearch = (): JSX.Element => {
    const {
        search: { search, clearSearch },
        filterState,
    } = useFilterApiContext();
    const [searchText, setSearchText] = useState<string | undefined>();

    const { searchOptions = [] } = useWorkSpace();

    const [searchMode, setSearchMode] = useState<SearchMode>('id/desc');

    const getPlaceholderText = () => {
        if (searchMode === 'all') {
            return 'Free text search';
        } else {
            return 'Search for id or title';
        }
    };

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
                placeholder={getPlaceholderText()}
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

interface MenuItem {
    title: string;
    onCLick: () => void;
}
interface SearchPickerDropdownProps {
    menuItems: MenuItem[];
}

export function SearchPickerDropdown({ menuItems }: SearchPickerDropdownProps): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div ref={ref}>
                <ClickableIcon
                    name="chevron_down"
                    onClick={() => setIsOpen(true)}
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            </div>
            {isOpen && (
                <Menu
                    id="menu-complex"
                    aria-labelledby="anchor-complex"
                    open={true}
                    anchorEl={ref.current}
                    onClose={() => setIsOpen(false)}
                    placement={'bottom-end'}
                    title="Search for.."
                >
                    {menuItems.map((s) => (
                        <Menu.Item key={s.title} onClick={s.onCLick}>
                            {s.title}
                        </Menu.Item>
                    ))}
                </Menu>
            )}
        </>
    );
}
