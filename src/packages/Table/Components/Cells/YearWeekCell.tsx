import { DateTime } from 'luxon';
import { HTMLAttributes, useMemo } from 'react';
import { CellProps, CellRenderProps, TableData } from '../../Types/types';

const YearWeekCell = <T extends TableData>(props: CellProps<T, CellRenderProps<T>>) => {
    const {
        value: { content, currentKey, cellAttributeFn },
    } = props;

    const attr = useMemo(
        () => (cellAttributeFn ? cellAttributeFn(content) : undefined),
        [cellAttributeFn, content]
    );

    const dateOrUndefined = toDate(content[currentKey]);

    const dateDisplay = dateOrUndefined
        ? `${dateOrUndefined.year}-${
              dateOrUndefined.weekNumber < 10
                  ? '0' + dateOrUndefined.weekNumber
                  : dateOrUndefined.weekNumber
          }`
        : '';

    return <div {...attr}>{dateDisplay}</div>;
};

const toDate = (date: unknown) => {
    if (!date) {
        return undefined;
    }
    try {
        const newDate = new Date(date as string);
        return DateTime.fromJSDate(newDate).isValid ? DateTime.fromJSDate(newDate) : undefined;
    } catch {
        return undefined;
    }
};

type CustomYearAndWeekCellProps<T extends string | null> = {
    dateString: T;
    cellAttributeFunction?: (content: T) => HTMLAttributes<HTMLElement>;
    overdue?: boolean;
};
const CustomYearAndWeekCell = <T extends string | null>({
    dateString,
    cellAttributeFunction,
    overdue,
}: CustomYearAndWeekCellProps<T>) => {
    const dateOrUndefined = toDate(dateString);
    const dateDisplay = dateOrUndefined
        ? `${dateOrUndefined.year}-${
              dateOrUndefined.weekNumber < 10
                  ? '0' + dateOrUndefined.weekNumber
                  : dateOrUndefined.weekNumber
          }`
        : '';
    const attr = useMemo(
        () => (cellAttributeFunction ? cellAttributeFunction(dateString) : undefined),
        [cellAttributeFunction, dateString]
    );

    return (
        <div {...attr}>
            {dateDisplay} {overdue && <span style={{ color: 'red', fontWeight: 600 }}> !</span>}
        </div>
    );
};

export { CustomYearAndWeekCell, YearWeekCell };
