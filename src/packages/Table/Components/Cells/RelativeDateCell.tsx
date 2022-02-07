import { DateTime } from 'luxon';
import { CellProps } from 'react-table';
import { CellRenderProps, TableData } from '../../types';

export const RelativeDateCell = <T extends TableData>(
    props: CellProps<T, CellRenderProps<T>>
): JSX.Element => {
    const {
        value: { content, currentKey },
    } = props;

    if (content[currentKey] === null || content[currentKey] === undefined) {
        return <></>;
    }

    const dateString = content[currentKey] as string;

    const date = new Date(dateString);
    const formattedDate = DateTime.fromJSDate(date).toRelative();
    // const formattedDate = new DateTime(date).toRelative();
    return <>{formattedDate}</>;
};
