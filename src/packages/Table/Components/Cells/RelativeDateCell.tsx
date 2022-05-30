import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { CellProps } from 'react-table';
import { CellRenderProps, TableData } from '../../Types/types';

export const RelativeDateCell = <T extends TableData>(
    props: CellProps<T, CellRenderProps<T>>
): JSX.Element => {
    const {
        value: { content, currentKey, cellAttributeFn },
    } = props;

    const attr = useMemo(
        () => (cellAttributeFn ? cellAttributeFn(content) : undefined),
        [cellAttributeFn, content]
    );

    if (content[currentKey] === null || content[currentKey] === undefined) {
        return <></>;
    }

    const dateString = content[currentKey] as string;

    const date = new Date(dateString);
    const formattedDate = DateTime.fromJSDate(date).toRelative({ locale: 'en-GB' });
    return <div {...attr}>{formattedDate}</div>;
};
