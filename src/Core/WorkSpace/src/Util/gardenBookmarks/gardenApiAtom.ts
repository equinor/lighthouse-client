import { Atom } from '@dbeining/react-atom';
import { GardenApi } from '../../../../../components/ParkView/Models/gardenApi';

export const gardenApiAtom = Atom.of<GardenApi | null>(null);
