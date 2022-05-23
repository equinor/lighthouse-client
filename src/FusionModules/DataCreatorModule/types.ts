import { FunctionManifest } from '@equinor/lighthouse-functions';
import { ComponentManifest, WidgetManifest } from '@equinor/lighthouse-widgets';
import React from 'react';

export type GetCreatorFunction = () => Promise<CreatorManifest[]>;
export type GetCreatorComponent = (widgetId: string) => Promise<React.FC>;
export type AccessFunction = () => Promise<boolean>;
export type GetAccessFunction = (functionId: string) => Promise<AccessFunction>;

export interface DataCreatorConfig {
    getCreators: GetCreatorFunction;
    getCreatorComponent: GetCreatorComponent;
    getAccessFunction: GetAccessFunction;
}

export interface CreatorComponent extends ComponentManifest {
    widgetType: 'creator';
}

export interface CreatorManifest extends WidgetManifest {
    widgetType: 'creator';
    props: {
        accessCheckFunctionId: string;
        parentApp?: string;
    };
}

export interface AccessFunctionResult extends FunctionManifest {
    function: () => Promise<boolean>;
    functionId: string;
}

export type CreatorType = 'CreatorManifest' | 'CreatorComponent' | 'AccessFunctionResult';

export interface CreatorConfig extends CreatorManifest, CreatorComponent {
    props: {
        accessCheckFunctionId: string;
        parentApp: string;
        function: () => Promise<boolean>;
    };
}

export type Creator = (
    type: CreatorType
) => CreatorManifest | CreatorComponent | AccessFunctionResult;
