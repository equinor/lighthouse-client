import { MemoExoticComponent, useCallback } from 'react';
import { VirtualItem } from 'react-virtual';
import styled from 'styled-components';
import { DataSet, GardenGroups } from '../../Models/data';
import { CustomHeaderView } from '../../Models/gardenOptions';
import { ActionType } from './ExpandProvider';
import { useExpandDispatch } from './useExpand';
import { getGardenItems } from './utils/getGardenItems';

const HeaderRoot = styled.div`
    position: sticky;
    z-index: 1;
    top: 0;
`;

const Header = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 35px;
    will-change: transform;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid white;
`;
type HeaderContainerProps<T> = {
    columnVirtualizer: { virtualItems: VirtualItem[] };
    headerChild: MemoExoticComponent<(args: CustomHeaderView<T>) => JSX.Element>;
    garden: GardenGroups<T>;
    highlightColumn: string | undefined;
};
export const HeaderContainer = <T extends unknown>(props: HeaderContainerProps<T>) => {
    const { columnVirtualizer, garden, headerChild: HeaderChild, highlightColumn } = props;
    const expandColumn = useExpandDispatch();
    const handleHeaderClick = useCallback(
        (index: number, column: DataSet<T>) => {
            expandColumn({
                type: ActionType.EXPAND_COLUMN,
                index,
                key: column.value,
                descriptionData: getGardenItems(column),
            });
        },
        [expandColumn, getGardenItems]
    );
    return (
        <HeaderRoot>
            {columnVirtualizer.virtualItems.map((virtualColumn) => {
                const isHighlighted = highlightColumn === garden[virtualColumn.index].value;
                return (
                    <Header
                        onClick={() =>
                            handleHeaderClick(virtualColumn.index, garden[virtualColumn.index])
                        }
                        style={{
                            width: `${virtualColumn.size}px`,
                            transform: `translateX(${virtualColumn.start}px) translateY(0px)`,
                            backgroundColor: isHighlighted ? '#007079' : '#f7f7f7',
                            color: isHighlighted ? 'white' : 'black',
                        }}
                        key={virtualColumn.index}
                    >
                        {HeaderChild ? (
                            <HeaderChild garden={garden} columnIndex={virtualColumn.index} />
                        ) : (
                            garden[virtualColumn.index].value
                        )}
                    </Header>
                );
            })}
        </HeaderRoot>
    );
};
