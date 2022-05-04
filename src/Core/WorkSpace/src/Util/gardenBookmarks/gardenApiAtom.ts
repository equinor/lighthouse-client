import { Atom } from '@dbeining/react-atom';
import { GardenApi } from '../../../../../components/ParkView/Components/VirtualGarden/Container';

export const gardenApiAtom = Atom.of<GardenApi | null>(null);
