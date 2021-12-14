import { Icon } from '@equinor/eds-core-react';
import { useRef, useState } from 'react';
import { HeaderGroup } from 'react-table';
// TODO : alias import for filter?
import { useFilter } from '../../../components/Filter/Hooks/useFilter';
import { TableData } from '../types';
import { HeaderCellMenu } from './HeaderCellMenu';
import { ResizeHandle } from './ResizeHandle';
import { HeaderActions, HeaderItem, TableHeadCell } from './Styles';
export interface HeaderCellProps extends HeaderGroup<TableData> {
    FilterComponent?: React.FC<{ filterId: string }>;
}

export const HeaderCell = (column: HeaderCellProps) => {
    const { filterData } = useFilter();
    // const filter = useMemo(() => filterData[column.id], [filterData, column.id]);
    // const hasFilter = useMemo(() => {
    //     let hasFilter = false;
    //     Object.keys(filter.value).forEach(key => {
    //         if (filter.value[key].checked) {
    //             hasFilter = true;
    //         }
    //     })
    //     return hasFilter
    // }, [filter])

    const [isOpen, setIsOpen] = useState(false);
    const headerCellRef = useRef<HTMLDivElement | null>(null);

    return (
        <TableHeadCell {...column.getHeaderProps()} ref={headerCellRef}>
            {column.render('Header')}
            <HeaderActions>
                {/* {
                    hasFilter && <HeaderItem >
                        <Icon name={"filter_list"} size={16} />
                    </HeaderItem>
                } */}
                {column.isGrouped && (
                    <HeaderItem {...column.getGroupByToggleProps()}>
                        <Icon name={'view_agenda'} size={16} />
                    </HeaderItem>
                )}
                {column.canResize && (
                    <>
                        <HeaderItem onClick={() => setIsOpen((s) => !s)}>
                            <Icon name={'more_vertical'} size={16} />
                        </HeaderItem>
                        <ResizeHandle column={column} />
                        {isOpen && (
                            <HeaderCellMenu
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                anchorEl={headerCellRef.current}
                                {...column}
                            />
                        )}
                    </>
                )}
            </HeaderActions>
        </TableHeadCell>
    );
};
