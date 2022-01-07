import { Factory } from '@equinor/DataFactory';
import { AnalyticsOptions } from '@equinor/Diagrams';
import { FilterOptions } from '@equinor/filter';
import React from 'react';
import {
    GardenOptions,
    PowerBiOptions,
    StatusFunc,
    TableOptions,
    TreeOptions,
    WorkflowEditorOptions,
} from './State';

export type DataSource<T> = () => Promise<T[]>;
export type Validator<T> = (data: unknown[]) => T[];
export type FactoryOptions = Omit<Factory, 'factoryId'>;

export interface ViewerOptions<T> {
    initialState: T[];
    viewerId: string;
    dataFactoryCreator(factory: Factory): void;
    openSidesheet(SidesheetContent?: React.FC<any>, props?: any): void;
    CustomSidesheet?: React.FC<T>;
    CustomSidesheetList?: React.FC<T[]>;
}

export interface DataViewerProps<T> extends ViewOptions<T> {
    data: T;
}

export interface ViewOptions<T> {
    objectIdentifierKey: keyof T;
    title?: {
        key: keyof T;
        label: string;
    };
    description?: {
        key: keyof T;
        label: string;
    };
}

export interface WorkSpaceApi<T> {
    registerDataSource: (dataSource: DataSource<T>) => void;
    registerDataCreator: (factory: FactoryOptions) => void;
    registerDataValidator: (validator: Validator<T>) => void;
    registerCustomContentView: (
        viewComponent: React.FC<DataViewerProps<T>>,
        viewOptions: ViewOptions<T>
    ) => void;
    registerFilterOptions: (options: FilterOptions<T>) => void;
    registerTableOptions: (options: TableOptions<T>) => void;
    registerTreeOptions: (options: TreeOptions<T>) => void;
    registerGanttOptions: (options: any) => void;
    registerGardenOptions: (options: GardenOptions<T>) => void;
    registerAnalyticsOptions: (options: AnalyticsOptions<T>) => void;
    registerStatusItems: (options: StatusFunc<T>) => void;
    registerPowerBIOptions: (options: PowerBiOptions) => void;
    registerWorkflowEditorOptions: (options: WorkflowEditorOptions) => void;
}
