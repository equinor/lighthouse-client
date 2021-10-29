export type DataFetcher<T> = () => Promise<T[]>;
export type Validator<T> = (data: unknown[]) => T[];

export interface ViewerOptions<T> {
    initialState: T[];
    primaryViewKey: keyof T;
    viewerId: string;
}

export interface DataViewerProps<T> extends ViewOptions<T> {
    data: T;
}

export interface ViewOptions<T> {
    title?: {
        key: keyof T;
        label: string;
    };
    description?: {
        key: keyof T;
        label: string;
    };
}

export interface DataViewerApi<T> {
    registerDataFetcher: (dataFetcher: DataFetcher<T>) => void;
    registerDataValidator: (validator: Validator<T>) => void;
    registerCustomContentView: (
        viewComponent: React.FC<DataViewerProps<T>>,
        viewOptions: ViewOptions<T>
    ) => void;
    registerFilterOptions: (options: any) => void;
    registerTableOptions: (options: any) => void;
    registerTreeOptions: (options: any) => void;
    registerGanttOptions: (options: any) => void;
    registerGardenOptions: (options: any) => void;
    registerAnalyticsOptions: (options: any) => void;
}
