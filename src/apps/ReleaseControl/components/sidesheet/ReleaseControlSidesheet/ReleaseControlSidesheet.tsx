import { useAtom } from '@dbeining/react-atom';
import { createAtom } from '@equinor/atom';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect } from 'react';
import {
    disableEditMode,
    sideSheetEditModeAtom,
    toggleEditMode,
} from '../../../Atoms/editModeAtom';
import { ReleaseControl } from '../../../types/releaseControl';
import { updateContext } from './updateContext';

import { DRCFormAtomApi } from '../../../Atoms/formAtomApi';
import {
    getReleaseControlSnapshot,
    useGetReleaseControl,
    useReleaseControlAccess,
    useReleaseControlMutationWatcher,
    useSidesheetEffects,
} from '../../../hooks';
import { SidesheetWrapper } from './sidesheetStyles';
import { Case, Switch } from '@equinor/JSX-Switch';
import { ReleaseControlDetailView } from './ReleaseControlDetailView';
import { ReleaseControlRequestEditForm } from './ReleaseControlRequestEditForm';

interface ReleaseControlSidesheetProps {
    item: ReleaseControl;
    actions: SidesheetApi;
}
export const ReleaseControlSidesheet = ({
    actions,
    item,
}: ReleaseControlSidesheetProps): JSX.Element => {
    useReleaseControlMutationWatcher(item.id);
    useGetReleaseControl(item.id, item);
    useReleaseControlAccess(item.id);
    useSidesheetEffects(actions, toggleEditMode, item.id);

    const { clearState } = DRCFormAtomApi;

    const editMode = useAtom(sideSheetEditModeAtom);
    useEffect(() => {
        disableEditMode();
        clearState();
        updateContext(item, actions);
    }, [item?.id]);

    if (Object.keys(getReleaseControlSnapshot().releaseControl).length < 2) {
        return <></>;
    }

    return (
        <SidesheetWrapper>
            <Switch>
                <Case when={editMode}>
                    <ReleaseControlRequestEditForm />
                </Case>
                <Case when={true}>
                    <ReleaseControlDetailView />
                </Case>
            </Switch>
        </SidesheetWrapper>
    );
};

export const relaseControlSidesheetContext = createAtom({});
