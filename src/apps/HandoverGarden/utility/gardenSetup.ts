import { FieldSettings } from '../../../components/ParkView/Models/fieldSettings';
import { HandoverPackage } from '../models/HandoverPackage';
import { getDateKey, getProgressKey } from './getKeyFunctions';
import { sortProgress } from './sortFunctions';

export type ExtendedGardenFields = 'RFCC' | 'TAC' | 'RFOC' | 'DCC' | 'RFRC';

export const fieldSettings: FieldSettings<HandoverPackage, ExtendedGardenFields> = {
    RFCC: { label: 'RFCC', getKey: getDateKey },
    TAC: { label: 'TAC', getKey: getDateKey },
    RFOC: { label: 'RFOC', getKey: getDateKey },
    DCC: { label: 'DCC', getKey: getDateKey },
    RFRC: { label: 'RFRC', getKey: getDateKey },
    responsible: { label: 'Comm Pkg Responsible' },
    area: { label: 'Comm Pkg Area' },
    phase: { label: 'Comm Pkg Phase' },
    progress: { label: 'Comm Pkg Progress', getKey: getProgressKey, getColumnSort: sortProgress },
    system: { label: 'System' },
    priority1: { label: 'Commissioning Priority 1' },
    priority2: { label: 'Commissioning Priority 2' },
    priority3: { label: 'Commissioning Priority 3' },
};
