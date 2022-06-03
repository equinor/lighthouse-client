import { Atom } from '@dbeining/react-atom';
import { SidesheetApi } from '@equinor/sidesheet';
import { ReleaseControlAccess } from '../hooks/useReleaseControlAccess';
import { ReleaseControl } from '../types/releaseControl';

export interface ReleaseControlAtom {
    releaseControl: ReleaseControl;
    requestAccess: ReleaseControlAccess;
    actions: SidesheetApi;
}

export const releaseControlAtom = Atom.of<ReleaseControlAtom>({
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
