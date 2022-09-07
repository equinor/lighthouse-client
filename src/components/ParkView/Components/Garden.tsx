import { ParkViewProvider } from '../Context/ParkViewProvider';
import { GardenApi } from '../Models/gardenApi';
import { GardenOptions } from '../Models/gardenOptions';
import { NoGardenOptions } from './NoGardenOptions';
import { VirtualContainer } from './VirtualGarden/Container';

type GardenProps<T extends Record<PropertyKey, unknown>> = {
    data: T[];
    gardenOptions: GardenOptions<T> | undefined;
    onGardenReady?: (api: GardenApi) => void;
};
export function Garden<T extends Record<PropertyKey, unknown>>({
    gardenOptions,
    data,
    onGardenReady,
}: GardenProps<T>): JSX.Element | null {
    //TODO:Handle no data better in garden
    if (!gardenOptions) return <NoGardenOptions />;
    if (!data) return null;
    return (
        <ParkViewProvider parkViewOptions={gardenOptions} data={data}>
            <VirtualContainer onGardenReady={onGardenReady} />
        </ParkViewProvider>
    );
}
