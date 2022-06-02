import { Search } from '@equinor/eds-core-react';
import { useOutsideClick, useTimeoutWithCancel } from '@equinor/hooks';
import { Fragment, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { IconMenu, MenuItem } from '../../../../../components/OverlayMenu/src';
import { ClickableIcon } from '../../../../../packages/Components/Icon';
import { useFilterApiContext } from '../../../../../packages/Filter/Hooks/useFilterApiContext';
import { useWorkSpace } from '../../WorkSpaceApi/useWorkSpace';
import { Divider } from '../DataViewerHeader/HeaderStyles';
import { TabButton } from '../ToggleButton';

/** Search button for searching data in workspace */
export function SearchButton(): JSX.Element {
    const selectedSearchItem = useRef<string>();
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState<string>('');
    const { searchOptions = [] } = useWorkSpace();
    const {
        search: { clearSearch, search },
    } = useFilterApiContext();

    const run = useTimeoutWithCancel();

    function doSearch(value: string) {
        if (value === '') {
            clearSearch();
        } else {
            const valueFormatter = searchOptions.find(
                ({ name }) => name === selectedSearchItem.current
            );
            if (!valueFormatter) return;
            search(value, [valueFormatter], 'Data', 'includes');
        }
    }

    function handleInput(e) {
        const value = e.target.value;
        setSearchText(value);
    }

    function handleSearch() {
        run(() => doSearch(searchText), 200);
    }

    function handleClear(e) {
        if (!e.isTrusted) {
            setSearchText('');
            clearSearch();
        }
    }

    const availableSearchItems = useMemo(
        (): MenuItem[] =>
            searchOptions.map(
                ({ name }): MenuItem => ({
                    label: name,
                    onClick: () => {
                        selectedSearchItem.current = name;
                        setIsOpen(true);
                    },
                })
            ),
        [searchOptions]
    );

    const isSelected = searchText.length > 0;

    if (!searchOptions || searchOptions.length === 0) {
        return <></>;
    }

    return (
        <TestWrapper>
            <TabButton aria-selected={isSelected} width="auto" style={{ overflow: 'hidden' }}>
                <SearchWrapper>
                    {selectedSearchItem.current && isOpen ? (
                        <SearchInput>
                            <Search
                                onChange={handleClear}
                                placeholder={`Search in ${selectedSearchItem.current}`}
                                onInput={handleInput}
                                value={searchText}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </SearchInput>
                    ) : (
                        <ClickableIcon
                            name="search"
                            onClick={() => {
                                selectedSearchItem.current = searchOptions[0].name;
                                setIsOpen(true);
                            }}
                        />
                    )}
                </SearchWrapper>
            </TabButton>
            <TabButton aria-selected={isSelected} style={{ overflow: 'hidden' }} width="20px">
                <IconMenu items={availableSearchItems} iconName="chevron_down" placement="bottom" />
            </TabButton>
            <Divider />
        </TestWrapper>
    );
}

const TestWrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 48px;
`;

const SearchInput = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;
`;

const SearchWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
`;
