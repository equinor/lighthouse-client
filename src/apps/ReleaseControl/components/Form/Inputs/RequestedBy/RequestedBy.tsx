import { PCSPersonRoleSearch } from '@equinor/Workflow';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';

const { updateAtom, useAtomState } = DRCFormAtomApi;

const updateRequestedBy = (requestedBy: string) => {
    updateAtom({ requestedBy: requestedBy });
};

export const RequestedByInput = (): JSX.Element => {
    const requestedBy = useAtomState((s) => s.requestedBy ?? '');

    return (
        <PCSPersonRoleSearch
            onSelect={() => updateRequestedBy(requestedBy)}
            value={requestedBy}
            classification="RELEASECONTROL"
        />
    );
};
