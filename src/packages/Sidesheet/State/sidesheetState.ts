import React from 'react';

export interface SidesheetState<T> {
    SidesheetComponent?: React.FC<T>;
    props?: T;
    isMinimized: boolean;
    minWidth: number;
    defaultWidth: number;
    width: number;
    appName?: string;
    color: string;
    hasUnsavedChanges: boolean;
}
