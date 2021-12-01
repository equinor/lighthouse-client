import React from 'react';
import { GardenOptions } from '../../CompletionView/src/DataViewerApi/DataViewState';
import { ParkViewProvider } from '../Context/ParkViewProvider';
import { GardenView } from './GardenView';
import { NoGardenOptions } from './NoGardenOptions';

interface GardenProps<T> {
    data: T[];
    gardenOptions: GardenOptions<T> | undefined;
}
export function Garden<T>({ gardenOptions, data }: GardenProps<T>): JSX.Element {
    if (!gardenOptions) {
        return <NoGardenOptions />;
    }
    return (
        <ParkViewProvider parkViewOptions={gardenOptions} data={data}>
            <GardenView />
        </ParkViewProvider>
    );
}
