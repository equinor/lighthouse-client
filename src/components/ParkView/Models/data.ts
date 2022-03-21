import { Status } from '../../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';

export type DataSet<T> = {
    groupKey: keyof T;
    value: string;
    subGroups: Data<T>;
    items: T[];
    isExpanded: boolean;
    count: number;
    status?: Status;
    description?: string | undefined;
    subGroupCount: number;
};

export type Data<T> = {
    [key: string]: DataSet<T>;
};
