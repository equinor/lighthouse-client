import React from 'react';

export interface SidesheetState<T> {
    SidesheetComponent?: React.FC<T>;
    props?: T;
    isPinned?: true;
    //config
}
