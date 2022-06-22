import { useRef, useCallback, memo } from 'react';
import { useVirtual } from 'react-virtual';
import styled from 'styled-components';
import { FilterItemCheckbox } from '../../../../../../Core/WorkSpace/src/Components/QuickFilter/FilterItemCheckbox';
import { PowerBiFilterItem, ActiveFilter } from '../../../Types';

interface VirtualListProps {
    items: PowerBiFilterItem[];
    rowLength: number;
    checkedValues: ActiveFilter[];
    onClickFilter: (filter: PowerBiFilterItem, singleClick?: boolean) => Promise<void>;
}

export function VirtualList({
    items,
    rowLength,
    checkedValues,
    onClickFilter,
}: VirtualListProps): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtual({
        parentRef: ref,
        size: rowLength,
        estimateSize: useCallback(() => 22, []),
    });

    return (
        <div style={{ height: '100%', overflowY: 'scroll', overflowX: 'hidden' }} ref={ref}>
            <VirtualRowWrapper
                style={{
                    height: `${rowVirtualizer.totalSize}px`,
                }}
            >
                {rowVirtualizer.virtualItems.map((virtualRow) => {
                    const item = items[virtualRow.index];
                    return (
                        <FilterItemValue
                            virtualItem={virtualRow}
                            key={item.value}
                            ValueRender={() => <div>{item.value}</div>}
                            handleFilterItemLabelClick={() => onClickFilter(item, true)}
                            filterValue={item.value}
                            handleFilterItemClick={() => onClickFilter(item, false)}
                            isChecked={!checkedValues.includes(item.value)}
                        />
                    );
                })}
            </VirtualRowWrapper>
        </div>
    );
}

const VirtualRowWrapper = styled.div`
    width: auto;
    min-width: 180px;
    position: relative;
`;

export const FilterItemValue = memo(FilterItemCheckbox);
