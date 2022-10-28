import { Filter } from '@equinor/lighthouse-powerbi';
import React from 'react';

export type CoreViewState = {
    [key: string]: ViewState;
};

export type ViewState = {
    title: string;
    shortName: string;
    icon?: React.FC;
    onSelect(SidesheetContent?: React.FC<any>, props?: any): void;
    pages: {
        [key: string]: PageConfig;
    };
};

export type PageConfig = PowerBiOptions | FusionPowerBiOptions | DashboardOptions | CustomPage;

export type PowerBiOptions = PageBase & {
    type: 'PowerBi';
    test1: string;
};

export type FusionPowerBiOptions = PageBase & {
    type: 'FusionPowerBi';
    reportURI: string;
    filter?: Filter[];
    options?: { showFilter?: boolean; enablePageNavigation?: boolean };
};
export type DashboardOptions = PageBase & {
    type: 'Dashboard';
    dashboardId: string;
    description?: string;
};

export type CustomPage = PageBase & {
    type: 'Custom';
    component: React.FC;
};

export type PageBase = {
    title: string;
    icon?: React.FC;
};
