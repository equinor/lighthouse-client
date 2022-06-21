import { swap } from '@dbeining/react-atom';
import { SidesheetApi } from '@equinor/sidesheet';
import { releaseControlAtom } from '../../../Atoms/releaseControlAtom';
import { ReleaseControl } from '../../../types/releaseControl';
import { setCriteriaTemplates } from '../../Form/WorkflowEditor/WorkflowEditorHelpers';

export function updateContext(item?: ReleaseControl, api?: SidesheetApi): void {
    swap(releaseControlAtom, (old) => ({
        ...old,
        releaseControl: setCriteriaTemplates(item) ?? old.releaseControl,
        actions: api ?? old.actions,
    }));
}
