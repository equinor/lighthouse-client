import { AnalyticsOptions } from '@equinor/Diagrams';
import { KpiBuilder } from '@equinor/Kpi';
import React from 'react';

/** Core state for dashboards all registered with unique dashboardId */
export type DashboardState<T extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>> =
    {
        [dashboardId: string]: DashboardInstance<T>;
    };

/** Dashboard Instance can contain multiple dashboards */
export type DashboardInstance<T extends Record<PropertyKey, unknown>> = {
    dashboardId: string;
    title: string;
    description?: string;
    dataSource?: DataSource<T>;
    validator?: Validator<T>;
    icon?: React.FC;
    pages: Record<PropertyKey, PageConfig<T>>;
    filterOptions?: FilterOptions<T>;
    kpiBuilder?: KpiBuilder<T>;
};

export type PageConfig<T extends Record<PropertyKey, unknown>> = AnalyticsPage<T> | CustomPage<T>;

export type AnalyticsPage<T extends Record<PropertyKey, unknown>> = AnalyticsOptions<T> & {
    type: 'AnalyticsPage';
    pageId: string;
    title: string;
    icon?: React.FC;
};

export type CustomPage<T extends Record<PropertyKey, unknown>> = {
    type: 'Custom';
    pageId: string;
    component: React.FC;
    title: string;
    icon?: React.FC;
    data: T[];
};

export type DataSource<T extends Record<PropertyKey, unknown>> = (
    abortController?: AbortController
) => Promise<T[]>;
export type Validator<T extends Record<PropertyKey, unknown>> = (data: unknown[]) => T[];

export type FilterOptions<T extends Record<PropertyKey, unknown>> = {
    excludeKeys?: (keyof T)[];
    typeMap?: Partial<Record<keyof T, string>>;
    groupValue?: Record<string, (item: T) => string>;
    customRender?: Record<keyof T | string, React.FC<T>>;
};
