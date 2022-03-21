import { MemoExoticComponent, useCallback } from 'react';
import { VirtualItem } from 'react-virtual';
import styled from 'styled-components';
import { Data, DataSet } from '../../Models/data';
import { CustomHeaderView } from '../../Models/gardenOptions';
import { ActionType } from './ExpandProvider';
import { useExpandDispatch } from './useExpand';
import { getGardenItems } from './utils';

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
    text-align: left;
    cursor: pointer;
    border-radius: 5px;
    background: #f7f7f7;
    border: 1px solid white;
`;
type HeaderContainerProps<T> = {
    columnVirtualizer: { virtualItems: VirtualItem[] };
    headerChild: MemoExoticComponent<(args: CustomHeaderView<T>) => JSX.Element>;
    garden: Data<T>;
    columnKeys: string[];
    highlightColumn: string;
};
export const HeaderContainer = <T extends unknown>(props: HeaderContainerProps<T>) => {
    const {
        columnVirtualizer,
        garden,
        headerChild: HeaderChild,
        columnKeys,
        highlightColumn,
    } = props;
    const expandColumn = useExpandDispatch();
    const handleHeaderClick = useCallback(
        (index: number, key: string) => {
            console.log(garden[key]);
            expandColumn({
                type: ActionType.EXPAND_COLUMN,
                index,
                key,
                descriptionData: getGardenItems(garden[key]),
            });
        },
        [garden]
    );
    return (
        <HeaderRoot>
            {columnVirtualizer.virtualItems.map((virtualColumn) => {
                return (
                    <Header
                        onClick={() =>
                            handleHeaderClick(virtualColumn.index, columnKeys[virtualColumn.index])
                        }
                        style={{
                            width: `${virtualColumn.size}px`,
                            transform: `translateX(${virtualColumn.start}px) translateY(0px)`,
                            backgroundColor:
                                highlightColumn === garden[columnKeys[virtualColumn.index]].value
                                    ? 'yellow'
                                    : 'inherit',
                        }}
                        key={virtualColumn.index}
                    >
                        {HeaderChild && (
                            <HeaderChild
                                garden={garden}
                                columnKey={
                                    garden[columnKeys[virtualColumn.index]].groupKey as string
                                }
                            />
                        )}
                        {garden[columnKeys[virtualColumn.index]].value}
                    </Header>
                );
            })}
        </HeaderRoot>
    );
};
