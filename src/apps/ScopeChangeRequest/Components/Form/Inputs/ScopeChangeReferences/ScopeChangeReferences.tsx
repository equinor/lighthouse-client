import { useFacility } from '@equinor/lighthouse-portal-client';
import {
    CommissioningPackage,
    SearchReferences,
    SearchTag,
    TypedSelectOption,
} from '@equinor/Workflow';
import { CommPkg, McPkg } from '../../../../../../Core/GlobalSearh/Config/ProCoSys/types';
import { getCommPkgsByIds } from '../../../../../../packages/Workflow/src/Api/PCS/getCommPkgsByIds';
import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';

export const CommPkgPropertyFromTag = 'McPkgsThroughScope__CommPkg__CommPkgNo';
export const CommPkgDescriptionFromTag = 'McPkgsThroughScope__CommPkg__Description';
export const CommPkgPropertyFromMcPkg = 'CommPkgNo';

export const ScopeChangeReferences = (): JSX.Element => {
    const { updateAtom, useAtomState } = scopeChangeFormAtomApi;
    const onChange = async (newList: TypedSelectOption[]) => {
        //Extracts commPkg from tag

        // If newList is of type mcPkg
        // Do API call to procosys Commpkg search with newList.CommpkgNo
        //console.log result

        // if (newList[0].type === 'mcpkg') {
        //     const description = extractCommPkgDescriptionFromCommPkgNo(newList[0].object);
        // }

        const updatedList = [
            ...newList,
            ...extractCommPkgFromTags(newList),
            ...(await extractCommPkgFromMcPkg(newList)),
        ];

        updateAtom({
            //Remove duplicates
            references: updatedList.filter(
                (v, i, a) => a.map(({ value }) => value).indexOf(v.value) === i
            ),
        });
    };

    const references = useAtomState(({ references }) => references ?? []);

    return <SearchReferences onChange={onChange} references={references} />;
};

function extractCommPkgFromTags(references: TypedSelectOption[]): TypedSelectOption[] {
    const commpkgs = references.reduce((acc, curr) => {
        if (curr.type === 'tag' && curr.duplicateObjects && curr.duplicateObjects.length > 0) {
            curr.duplicateObjects.forEach((item) => {
                const commPkgNo = (item as SearchTag)[CommPkgPropertyFromTag];
                const commPkgDesc = (item as SearchTag)[CommPkgDescriptionFromTag];
                // Some tags can be linked to a voided commpkg - we don't want to add this commpkg if this is the case.
                commPkgNo &&
                    acc.push({
                        label: `${commPkgNo} - ${commPkgDesc}`,
                        value: commPkgNo,
                        object: item,
                        searchValue: commPkgDesc,
                        type: 'commpkg',
                    });
            });
        }
        return acc;
    }, [] as TypedSelectOption[]);
    return commpkgs;
}

async function extractCommPkgFromMcPkg(
    references: TypedSelectOption[]
): Promise<TypedSelectOption[]> {
    //
    const commPkgNos = references
        .filter(
            (reference) =>
                reference.type === 'mcpkg' && (reference.object as any)[CommPkgPropertyFromMcPkg]
        )
        .map((mcpkg) => (mcpkg.object as any)[CommPkgPropertyFromMcPkg]);
    const newCommPkgs = references
        .filter((ref) => ref.type === 'commpkg')
        .map((value) => (value.object as CommissioningPackage).CommPkgNo);
    const unresolvedCommPkgs = commPkgNos.filter((commPkgNo) => !newCommPkgs.includes(commPkgNo));
    const resolvedCommPkgs = await getCommPkgsByIds(unresolvedCommPkgs);
    return resolvedCommPkgs.map((commpkg) => ({
        object: commpkg,
        label: `${commpkg.CommPkgNo} - ${commpkg.Description}`,
        searchValue: commpkg.CommPkgNo,
        type: 'commpkg',
        value: commpkg.CommPkgNo,
    }));
}
