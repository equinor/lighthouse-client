import { ParkViewProvider } from '../Context/ParkViewProvider';
import { GardenApi } from '../Models/gardenApi';
import { GardenOptions } from '../Models/gardenOptions';
import { GardenView } from './GardenView';
import { NoGardenOptions } from './NoGardenOptions';
import { VirtualContainer } from './VirtualGarden/Container';

interface GardenProps<T> {
    data: T[];
    gardenOptions: GardenOptions<T> | undefined;
    onGardenReady?: (api: GardenApi) => void;
}
export function Garden<T>({
    gardenOptions,
    data,
    onGardenReady,
}: GardenProps<T>): JSX.Element | null {
    //TODO:Handle no data better in garden
    if (!gardenOptions) return <NoGardenOptions />;
    if (!data) return null;
    return (
        <ParkViewProvider parkViewOptions={gardenOptions} data={data}>
            {gardenOptions.type === 'virtual' ? (
                <VirtualContainer onGardenReady={onGardenReady} />
            ) : (
                <GardenView onGardenReady={onGardenReady} />
            )}
        </ParkViewProvider>
    );
}
