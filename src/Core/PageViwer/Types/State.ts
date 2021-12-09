import React from 'react';
import { Filter } from '../../../modules/powerBI/src/models/filter';

export interface CoreViewState {
    [key: string]: ViewState;
}

export interface ViewState {
    title: string;
    shortName: string;
    icon?: React.FC;
    pages: {
        [key: string]: PageConfig;
    };
}

export type PageConfig = PowerBiConfig | FusionPowerBiConfig | CustomPage;

export interface PowerBiConfig extends PageBase {
    type: 'PowerBi';
    test1: string;
}

export interface FusionPowerBiConfig extends PageBase {
    type: 'FusionPowerBi';
    reportURI: string;
    filter?: Filter[];
}
export interface CustomPage extends PageBase {
    type: 'Custom';
    component: React.FC;
}

export interface PageBase {
    title: string;
    icon?: React.FC;
}
