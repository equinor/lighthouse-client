import { Search } from '@equinor/eds-core-react';
import React, { Fragment, memo, useCallback, useMemo, useRef, useState } from 'react';
import { useVirtual } from 'react-virtual';
import { useWorkSpace } from '../../../../Core/WorkSpace/src/WorkSpaceApi/useWorkSpace';
import { FilterGroup, FilterItemCount } from '../../Hooks/useFilterApi';
import { useFilterApiContext } from '../../Hooks/useFilterApiContext';
import { FilterValueType } from '../../Types';
import FilterItemComponent from '../FilterItem/FilterItem';
import Icon from '../Icon/Icon';
import {
    AllCheckbox,
    FilterGroupWrapper,
    FilterHeaderGroup,
    FilterItemWrapper,
    SearchButton,
    Title,
    Wrapper,
} from './FilterGroupStyles';

interface FilterGroupeComponentProps {
    filterGroup: FilterGroup;
    hideTitle?: boolean;
    itemCounts: FilterItemCount[];
}

function searchByValue(items: string[], value: string) {
    return items.filter((item) => item.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
}

export const DEFAULT_NULL_VALUE = '(Blank)';
export const FilterWrapper = (props: Omit<FilterGroupeComponentProps, 'itemCounts'>) => {
    const {
        filterGroupState: { getFilterItemCountsForGroup },
    } = useFilterApiContext();

    // const itemCounts = useMemo(
    //     () => getFilterItemCountsForGroup(props.filterGroup.name),
    //     [props.filterGroup.name]
    // );

    return <FilterGroupeComponent {...props} itemCounts={[]} />;
};
export const FilterGroupeComponent: React.FC<FilterGroupeComponentProps> = ({
    filterGroup,
    itemCounts,
}: FilterGroupeComponentProps) => {
    // const {
    //     operations: { markAllValuesActive },
    //     filterGroupState: { getInactiveGroupValues, getFilterItemCountsForGroup },
    // } = useFilterApiContext();

    const [filterSearchValue, setFilterSearchValue] = useState('');
    const [searchActive, setSearchActive] = useState(false);

    const { filterOptions } = useWorkSpace();

    const groupsMatchingSearch = useMemo(
        () =>
            searchByValue(
                filterGroup.values.map((v) => (v !== null ? v.toString() : DEFAULT_NULL_VALUE)),
                filterSearchValue
            ),
        [filterGroup.values, filterSearchValue]
    );

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setFilterSearchValue(value);
    }

    /** //TODO: Handle items in view search */
    // const handleOnAllChange = () => markAllValuesActive(filterGroup.name);

    // const isAllChecked = getInactiveGroupValues(filterGroup.name).length === 0;

    function handleSearchButtonClick() {
        setSearchActive((isActive) => !isActive);
    }
    const rowLength = useMemo(() => groupsMatchingSearch.length, [groupsMatchingSearch]);

    // const itemCounts = getFilterItemCountsForGroup(filterGroup.name);
    const parentRef = useRef<HTMLDivElement | null>(null);
    const rowVirtualizer = useVirtual({
        parentRef,
        size: rowLength,
        estimateSize: useCallback(() => 30, []),
    });

    return (
        <div style={{ overflow: 'auto', width: '200px', height: '200px' }} ref={parentRef}>
            Title
            <div
                style={{
                    height: `${rowVirtualizer.totalSize}px`,
                    width: '100%',
                    position: 'relative',
                }}
            >
                {rowVirtualizer.virtualItems.map((virtualRow) => {
                    return (
                        <Temp
                            virtualRowSize={virtualRow.size}
                            virtualRowStart={virtualRow.start}
                            filterItem={groupsMatchingSearch[virtualRow.index]}
                            counts={
                                itemCounts.find(
                                    (item) =>
                                        item.name ===
                                        convertFromBlank(groupsMatchingSearch[virtualRow.index])
                                )?.count ?? 0
                            }
                        />
                    );

                    {
                        /* <FilterItemComponent
                                            count={
                                                itemCounts.find(
                                                    (item) =>
                                                        item.name ===
                                                        convertFromBlank(
                                                            groupsMatchingSearch[virtualRow.index]
                                                        )
                                                )?.count ?? 0
                                            }
                                            filterItem={convertFromBlank(
                                                groupsMatchingSearch[virtualRow.index]
                                            )}
                                            groupName={filterGroup.name}
                                        /> */
                    }
                })}
            </div>
        </div>
        // <Wrapper>
        //     <FilterHeaderGroup>
        //         {searchActive ? (
        //             <Search
        //                 autoFocus={searchActive}
        //                 aria-label="in filer group"
        //                 id="search-normal"
        //                 placeholder="Search"
        //                 onChange={handleOnChange}
        //             />
        //         ) : (
        //             <Title>{filterGroup.name}</Title>
        //         )}
        //         <SearchButton variant="ghost_icon" onClick={handleSearchButtonClick}>
        //             <Icon name={searchActive ? 'chevron_right' : 'search'} size={24} />
        //         </SearchButton>
        //     </FilterHeaderGroup>
        //     <FilterGroupWrapper>
        //         <FilterItemWrapper>
        //             <AllCheckbox
        //                 title={'All'}
        //                 label={'All'}
        //                 checked={isAllChecked}
        //                 onChange={handleOnAllChange}
        //             />

        //             {/* {groupsMatchingSearch.map((value) => (
        //                 <FilterItemComponent
        //                     key={value}
        //                     count={
        //                         itemCounts.find(({ name }) => name === convertFromBlank(value))
        //                             ?.count ?? 0
        //                     }
        //                     CustomRender={
        //                         filterOptions?.find(({ name }) => name === filterGroup.name)
        //                             ?.customValueRender
        //                     }
        //                     //HACK: Must recieve null and not blank
        //                     filterItem={convertFromBlank(value)}
        //                     groupName={filterGroup.name}
        //                 />
        //             ))} */}
        //         </FilterItemWrapper>
        //     </FilterGroupWrapper>

        // </Wrapper>
    );
};

function convertFromBlank(name: FilterValueType) {
    return name === DEFAULT_NULL_VALUE ? null : name;
}

type Props = {
    virtualRowStart: number;
    virtualRowSize: number;
    filterItem: string;
    counts: number;
};
export const Temp = memo(({ virtualRowStart, virtualRowSize, filterItem, counts }: Props) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRowStart}px)`,
                height: `${virtualRowSize}px`,
            }}
        >
            {filterItem} {counts}
        </div>
    );
});
