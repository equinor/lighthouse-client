import { Icon } from '@equinor/eds-core-react';
import { useRef, useState } from 'react';
import { HeaderGroup } from 'react-table';
import { TableData } from '../Types/types';
import { HeaderCellMenu } from './HeaderCellMenu';
import { ResizeHandle } from './ResizeHandle';
import { HeaderActions, HeaderItem, TableHeadCell } from './Styles';
export interface HeaderCellProps extends HeaderGroup<TableData> {
    FilterComponent?: React.FC<{ filterId: string }>;
}

export const HeaderCell = (column: HeaderCellProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const headerCellRef = useRef<HTMLDivElement | null>(null);

    return (
        <TableHeadCell {...column.getHeaderProps()} ref={headerCellRef}>
            {column.render('Header')}
            <HeaderActions>
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
