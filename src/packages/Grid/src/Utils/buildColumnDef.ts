import { ColumnDefintion } from '../../../../Core/WorkSpace/src/WorkSpaceApi/State';
import { ValueFormatterParams } from '@ag-grid-enterprise/all-modules';

export function buildColumnDef<T>(
    object: T,
    columnDefinition?: ColumnDefintion<T>[],
    hiddenColumns?: (keyof T)[]
): ColumnDefintion<any>[] {
    const columnDefs: ColumnDefintion<any>[] = columnDefinition || [];

    Object.keys(object).forEach((key) => {
        const found = columnDefs.find((colDef) => colDef.field === key);
        if (!found && !hiddenColumns?.includes(key as keyof T)) {
            columnDefs.push({
                field: key,
                valueFormatter: valueFormatter,
                filterParams: {
                    valueFormatter: valueFormatter,
                },
            });
        }
    });


    return columnDefs;
}

export function valueFormatter(params: ValueFormatterParams): string {
    switch (typeof params.value) {
        case 'undefined': {
            return '-';
        }

        case 'object': {
            return handleObject(params.value);
        }

        case 'boolean': {
            return params.value.toString();
        }

        case 'number': {
            return Math.round(params.value).toString();
        }
    }
    return '';
}

function handleObject(value: unknown): string {
    if (value === null) {
        return '-';
    }

    if (Array.isArray(value)) {
        return `${value.length}`;
    }

    return 'Obj';
}
