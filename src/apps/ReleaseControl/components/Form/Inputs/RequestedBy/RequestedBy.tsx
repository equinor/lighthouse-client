import { PCSPersonRoleSearch, TypedSelectOption } from '@equinor/Workflow';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';
import { StyledRequestedByHeader } from './requestedBy.styles';

const { updateAtom, useAtomState } = DRCFormAtomApi;

const updateRequestedBy = (requestedBy: TypedSelectOption | undefined) => {
    updateAtom({ requestedBy: requestedBy?.value, requestedByOption: requestedBy });
};

export const RequestedByInput = (): JSX.Element => {
    const requestedBy = useAtomState((s) => s.requestedByOption);

    return (
        <div>
            <StyledRequestedByHeader>
                <div>Requested by</div>
                <div>(Required)</div>
            </StyledRequestedByHeader>
            <PCSPersonRoleSearch
                onSelect={(item) => updateRequestedBy(item ?? undefined)}
                classification="RELEASECONTROL"
                value={requestedBy?.label}
            />
        </div>
    );
};
