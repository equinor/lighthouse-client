import React from 'react';
import { DefaultDataView } from '../Components/DefaultDataView';

import { getSidesheetContext } from '../context/sidesheetContext';
import { dispatch } from '../State/actions';

export function openSidesheet<T>(SidesheetContent?: React.FC<T>, props?: T): void {
    if (!SidesheetContent && !props) return;

    dispatch(getSidesheetContext(), () => {
        return {
            SidesheetComponent: (SidesheetContent as React.FC<unknown>) || DefaultDataView,
            props,
        };
    });
}
