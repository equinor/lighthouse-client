import React from 'react';
import { NoGardenOptions } from './NoGardenOptions';
import { GardenOptions } from '../../CompletionView/src/DataViewerApi/DataViewState';
import { ParkViewProvider } from '../Context/ParkViewProvider';
import { GardenView } from './GardenView';

interface GardenProps<T> {
    data: unknown[];
    gardenOptions: GardenOptions<T> | undefined;
}
export const Garden = ({ gardenOptions, data }: GardenProps<unknown>): JSX.Element => {
    if (!gardenOptions) {
        return <NoGardenOptions />;
    }
    return (
        <ParkViewProvider parkViewOptions={gardenOptions} data={data}>
            <GardenView />
        </ParkViewProvider>
    );
};
