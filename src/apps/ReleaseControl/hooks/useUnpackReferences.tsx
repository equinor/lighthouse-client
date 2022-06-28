import { useFacility } from '@equinor/lighthouse-portal-client';
import { useEffect } from 'react';
import { useQueryCacheLookup } from '../../../hooks/QueryCache/useQueryCacheLookup';
import { TypedSelectOption } from '../../ScopeChangeRequest/api/Search/searchType';
import { proCoSysQueryKeys } from '../../ScopeChangeRequest/keys/proCoSysQueryKeys';
import { stidQueryKeys } from '../../ScopeChangeRequest/keys/STIDQueryKeys';
import { getDocumentById } from '../api/releaseControl/PCS/getDocumentById';
import { getPunchListItemByNo } from '../api/releaseControl/PCS/getPunchListItemByNo';
import { DRCFormAtomApi } from '../Atoms/formAtomApi';
import { transformIsoDate } from '../components/Workflow/Utils/dateFormatting';
import { ReleaseControl } from '../types/releaseControl';

interface UseUnpackReferencesParams {
    releaseControl: ReleaseControl;
}

export function useUnpackReferences({ releaseControl }: UseUnpackReferencesParams): void {
    const { addToQueryCache } = useQueryCacheLookup();
    const referencesKeys = { ...proCoSysQueryKeys(), ...stidQueryKeys() };
    const { procosysPlantId: facilityId } = useFacility();

    const { updateAtom, readAtomValue } = DRCFormAtomApi;

    const handleReferencesChanged = (newVals: TypedSelectOption[]) => {
        updateAtom({ references: newVals });
    };

    useEffect(() => {
        unpackReferences(releaseControl, handleReferencesChanged);
    }, [releaseControl.id]);

    function updateReferences(x: TypedSelectOption) {
        const references = readAtomValue().references ?? [];

        const index = references.findIndex(({ value }) => value === x.value);
        if (index === -1) return;
        handleReferencesChanged([...references.slice(0, index), x, ...references.slice(index + 1)]);
    }

    async function unpackReferences(
        releaseControl: ReleaseControl,
        handleReferencesChanged: (references: TypedSelectOption[]) => void
    ) {
        const { readAtomValue } = DRCFormAtomApi;

        const appendReferences = (x: TypedSelectOption) =>
            handleReferencesChanged([...(readAtomValue().references ?? []), x]);

        releaseControl.punchListItems.forEach(async (x) => {
            const punchSelectedOption: TypedSelectOption = {
                label: `${x.procosysId}`,
                object: x,
                searchValue: x.procosysId.toString(),
                type: 'punch',
                value: x.procosysId.toString(),
            };

            appendReferences(punchSelectedOption);

            const punch = await addToQueryCache(['Punch', punchSelectedOption.value], () =>
                getPunchListItemByNo(x.procosysId)
            );

            updateReferences({
                ...punchSelectedOption,
                label: `${punch.punchItemNo} ${punch.description}`,
                object: punch,
            });
        });

        releaseControl.documents.forEach(async (x) => {
            const documentSelectOption: TypedSelectOption = {
                label: `${x.stidDocumentNumber}`,
                value: x.stidDocumentNumber,
                object: x,
                searchValue: x.stidDocumentNumber,
                type: 'document',
            };
            appendReferences(documentSelectOption);

            const document = await addToQueryCache(
                referencesKeys.document(x.stidDocumentNumber),
                () => getDocumentById(x.stidDocumentNumber, facilityId)
            );
            updateReferences({
                ...documentSelectOption,
                label: `${x.stidDocumentNumber} ${document.docTitle}`,
                object: document,
                metadata: `Revision ${document.currentRevision.revNo} | Rev date ${
                    document.currentRevision.revDate &&
                    transformIsoDate(document.currentRevision.revDate)
                } | Reason for issue ${
                    document.currentRevision.reasonForIssue &&
                    document.currentRevision.reasonForIssue
                }`,
            });
        });
    }
}
