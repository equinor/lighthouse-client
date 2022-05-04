import { useEffect, useRef } from 'react';
import { ParkViewProvider } from '../Context/ParkViewProvider';
import { GardenOptions } from '../Models/gardenOptions';
import { GardenView } from './GardenView';
import { NoGardenOptions } from './NoGardenOptions';
import { GardenApi, VirtualContainer } from './VirtualGarden/Container';

interface GardenProps<T> {
    data: T[];
    gardenOptions: GardenOptions<T> | undefined;
    onGardenReady?: (api: GardenApi) => void;
    onGardenUnmount?: (api: GardenApi) => void;
}
export function Garden<T>({
    gardenOptions,
    data,
    onGardenReady,
    onGardenUnmount,
}: GardenProps<T>): JSX.Element | null {
    const api = useRef<GardenApi>();

    const interceptApi = (gardenApi: GardenApi) => {
        api.current = gardenApi;
        onGardenReady && onGardenReady(gardenApi);
    };

    useEffect(() => {
        return () => {
            onGardenUnmount && onGardenUnmount(api.current as GardenApi);
        };
    }, []);

    //TODO:Handle no data better in garden
    if (!gardenOptions) return <NoGardenOptions />;
    if (!data) return null;
    return (
        <ParkViewProvider parkViewOptions={gardenOptions} data={data}>
            {gardenOptions.type === 'virtual' ? (
                <VirtualContainer onGardenReady={interceptApi} />
            ) : (
                <GardenView onGardenReady={interceptApi} />
            )}
        </ParkViewProvider>
    );
}
