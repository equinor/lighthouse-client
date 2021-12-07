import React from 'react';

export interface CoreViewState {
    [key: string]: ViewState;
}

export interface ViewState {
    title: string;
    shortName: string;
    pages: {
        [key: string]: PageConfig;
    };
}

export type PageConfig = PowerBiConfig | FusionPowerBiConfig | CustomView;

interface PowerBiConfig extends PageBase {
    type: 'PowerBi';
    test1: string;
}

interface FusionPowerBiConfig extends PageBase {
    type: 'FusionPowerBi';
    test2: string;
}
interface CustomView extends PageBase {
    type: 'Custom';
    component: React.FC;
}

export interface PageBase {
    title: string;
    icon?: React.FC;
}
