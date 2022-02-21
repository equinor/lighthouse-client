import { AnalyticsOptions } from '@equinor/Diagrams';
import { KpiBuilder } from '@equinor/Kpi';
import React from 'react';

/** Core state for dashboards all registered with unique dashboardId */
export interface DashboardState {
    [dashboardId: string]: DashboardInstance<unknown>;
}

/** Dashboard Instance can contain multiple dashboards */
export interface DashboardInstance<T> {
    dashboardId: string;
    title: string;
    description?: string;
    dataSource?: DataSource<T>;
    validator?: Validator<T>;
    icon?: React.FC;
    pages: Record<string, PageConfig<T>>;
    filterOptions?: FilterOptions<T>;
    kpiBuilder?: KpiBuilder<T>;
}

export type PageConfig<T> = AnalyticsPage<T> | CustomPage<T>;

export interface AnalyticsPage<T> extends AnalyticsOptions<T> {
    type: 'AnalyticsPage';
    pageId: string;
    title: string;
    icon?: React.FC;
}

export interface CustomPage<T> {
    type: 'Custom';
    pageId: string;
    component: React.FC;
    title: string;
    icon?: React.FC;
    data: T[];
}

export type DataSource<T> = (abortController?: AbortController) => Promise<T[]>;
export type Validator<T> = (data: unknown[]) => T[];

export interface FilterOptions<T> {
    excludeKeys?: (keyof T)[];
    typeMap?: Partial<Record<keyof T, string>>;
    groupValue?: Record<string, (item: T) => string>;
    customRender?: Record<keyof T | string, React.FC<T>>;
}
