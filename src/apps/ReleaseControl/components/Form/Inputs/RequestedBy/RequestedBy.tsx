import { PCSPersonRoleSearch } from '@equinor/Workflow';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';

const { updateAtom, useAtomState } = DRCFormAtomApi;

const updateRequestedBy = (requestedBy: string) => {
    updateAtom({ requestedBy: requestedBy });
};

export const RequestedByInput = (): JSX.Element => {
    const requestedBy = useAtomState((s) => s.requestedBy ?? '');

    return (
        //AVSLUTTET HER
        // add styling for the small heading over person/role search, and "(required) over to the right"
        <PCSPersonRoleSearch
            onSelect={() => updateRequestedBy(requestedBy)}
            value={requestedBy}
            classification="RELEASECONTROL"
        />
    );
};
