import { PCSPersonRoleSearch } from '@equinor/Workflow';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';
import { StyledRequestedByHeader } from './requestedBy.styles';

const { updateAtom, useAtomState } = DRCFormAtomApi;

const updateRequestedBy = (requestedBy: string) => {
    updateAtom({ requestedBy: requestedBy });
};

export const RequestedByInput = (): JSX.Element => {
    const requestedBy = useAtomState((s) => s.requestedBy ?? '');

    return (
        //AVSLUTTET HER
        //Skal man legge til et POST api kall og legge den inn i onSelect??

        <div>
            <StyledRequestedByHeader>
                <p>Requested by</p>
                <p>(Required)</p>
            </StyledRequestedByHeader>
            <PCSPersonRoleSearch
                onSelect={() => updateRequestedBy(requestedBy)}
                classification="RELEASECONTROL"
                value={requestedBy}
            />
        </div>
    );
};
