import { ParkViewProvider } from '../Context/ParkViewProvider';
import { GardenOptions } from '../Models/gardenOptions';
import { GardenView } from './GardenView';
import { NoGardenOptions } from './NoGardenOptions';
import { GardenApi, VirtualContainer } from './VirtualGarden/Container';

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
    if (!gardenOptions) return <NoGardenOptions />;

    //TODO:Handle no data better in garden
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
