export type DataSet<T> = {
    groupKey: keyof T;
    value: string;
    subGroups: Data<T>;
    items: T[];
    isExpanded: boolean;
    count: number;
};

export type Data<T> = {
    [key: string]: DataSet<T>;
};
