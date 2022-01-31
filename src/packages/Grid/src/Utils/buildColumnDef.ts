import { ColumnDefintion } from "../../../../Core/WorkSpace/src/WorkSpaceApi/State";

export function buildColumnDef<T>(object: T, columnDefinition?: ColumnDefintion<T>[], hiddenColumns?: (keyof T)[]){
    let columnDefs: ColumnDefintion<any>[] = columnDefinition || [];

    Object.keys(object).forEach((key) => {
        const found = columnDefs.find((colDef) => colDef.field === key)
        if(!found && !hiddenColumns?.includes(key as keyof T)){
            columnDefs.push({field: key})
        }
    })

    return columnDefs;
}