import { ParkViewProvider } from '../Context/ParkViewProvider';
import { GardenOptions } from '../Models/gardenOptions';
import { GardenView } from './GardenView';
import { NoGardenOptions } from './NoGardenOptions';
import { VirtualContainer } from './VirtualGarden/Container';
import { VirtualGarden } from './VirtualGarden/VirtualGarden';

interface GardenProps<T> {
    data: T[];
    gardenOptions: GardenOptions<T> | undefined;
}
export function Garden<T>({ gardenOptions, data }: GardenProps<T>): JSX.Element {
    if (!gardenOptions) return <NoGardenOptions />;
    if (!data) return <h1>No data</h1>;
    return (
        <ParkViewProvider parkViewOptions={gardenOptions} data={data}>
            <VirtualContainer />
            <GardenView />
        </ParkViewProvider>
    );
}
