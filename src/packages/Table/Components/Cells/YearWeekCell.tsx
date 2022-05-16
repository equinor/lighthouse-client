import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { CellProps, CellRenderProps, TableData } from '../../types';

export const YearWeekCell = <T extends TableData>(props: CellProps<T, CellRenderProps<T>>) => {
    const {
        value: { content, currentKey, cellAttributeFn },
    } = props;

    const attr = useMemo(
        () => (cellAttributeFn ? cellAttributeFn(content) : undefined),
        [cellAttributeFn]
    );

    const dateOrUndefined = toDate(content[currentKey]);

    const dateDisplay = dateOrUndefined
        ? `${dateOrUndefined.year}-${
              dateOrUndefined.weekNumber < 10
                  ? '0' + dateOrUndefined.weekNumber
                  : dateOrUndefined.weekNumber
          }`
        : 'N/A';

    return <div {...attr}>{dateDisplay}</div>;
};

const toDate = (date: unknown) => {
    try {
        const newDate = new Date(date as string);
        return DateTime.fromJSDate(newDate).isValid ? DateTime.fromJSDate(newDate) : undefined;
    } catch {
        return undefined;
    }
};
