import { Filter } from '@equinor/lighthouse-powerbi';
import React from 'react';

export interface CoreViewState {
    [key: string]: ViewState;
}

export interface ViewState {
    title: string;
    shortName: string;
    icon?: React.FC;
    onSelect(SidesheetContent?: React.FC<any>, props?: any): void;
    pages: {
        [key: string]: PageConfig;
    };
}

export type PageConfig = PowerBiOptions | FusionPowerBiOptions | DashboardOptions | CustomPage;

export interface PowerBiOptions extends PageBase {
    type: 'PowerBi';
    test1: string;
}

export interface FusionPowerBiOptions extends PageBase {
    type: 'FusionPowerBi';
    reportURI: string;
    filter?: Filter[];
    options?: { showFilter?: boolean; enablePageNavigation?: boolean };
}
export interface DashboardOptions extends PageBase {
    type: 'Dashboard';
    dashboardId: string;
    description?: string;
}

export interface CustomPage extends PageBase {
    type: 'Custom';
    component: React.FC;
}

export interface PageBase {
    title: string;
    icon?: React.FC;
}
