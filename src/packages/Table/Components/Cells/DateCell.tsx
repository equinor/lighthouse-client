import { useMemo } from 'react';
import { CellProps } from 'react-table';
import styled from 'styled-components';
import { CellRenderProps, TableData } from '../../Types/types';
const DateWrap = styled.div`
    font-size: 13px;
    color: gray;
`;
const DateCell = <T extends TableData>(props: CellProps<T, CellRenderProps<T>>) => {
    const {
        value: { content, currentKey, cellAttributeFn },
    } = props;

    const attr = useMemo(
        () => (cellAttributeFn ? cellAttributeFn(content) : undefined),
        [cellAttributeFn]
    );

    const dateDisplay = content[currentKey]
        ? new Date(content[currentKey] as string).toLocaleDateString()
        : '';
    return <div {...attr}>{dateDisplay}</div>;
};
const dateConfig: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
};
type CustomDateCellProps = {
    dateString: string | null;
};
const CustomDateCell = ({ dateString }: CustomDateCellProps) => {
    const dateDisplay = dateString
        ? new Date(dateString).toLocaleDateString('en-GB', dateConfig)
        : '';

    return <DateWrap>{dateDisplay}</DateWrap>;
};

export { DateCell, CustomDateCell };
