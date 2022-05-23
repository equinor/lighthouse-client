import { SidesheetApi } from '@equinor/sidesheet';
import { createAtom } from '../../../Core/Atom/functions/createAtom';
import { OptionRequestResult } from '../api/releaseControl/Access/optionsRequestChecker';
import { ReleaseControl } from '../types/releaseControl';

export interface ReleaseControlAccess extends OptionRequestResult {
    canVoid: boolean;
    canUnVoid: boolean;
}

export interface ReleaseControlAtom {
    releaseControl: ReleaseControl;
    requestAccess: ReleaseControlAccess;
    actions: SidesheetApi;
}

export const releaseControlContext = createAtom<ReleaseControlAtom>({
    requestAccess: {
        canDelete: false,
        canGet: false,
        canPatch: false,
        canPost: false,
        canPut: false,
        canUnVoid: false,
        canVoid: false,
    },
    actions: {} as SidesheetApi,
    releaseControl: {} as ReleaseControl,
});
