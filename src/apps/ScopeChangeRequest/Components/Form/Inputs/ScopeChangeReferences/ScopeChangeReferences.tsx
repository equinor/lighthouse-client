import { SearchReferences, SearchTag, TypedSelectOption } from '@equinor/Workflow';
import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';

export const CommPkgProperty = 'McPkgsThroughScope__CommPkg__CommPkgNo';
export const CommPkgDescriptionFromTag = 'McPkgsThroughScope__CommPkg__Description';

export const ScopeChangeReferences = (): JSX.Element => {
    const { updateAtom, useAtomState } = scopeChangeFormAtomApi;
    const onChange = async (newList: TypedSelectOption[]) => {
        //Extracts commPkg from tag

        const updatedList = [...newList, ...extractCommPkgFromTags(newList)];

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
                const commPkgNo = (item as SearchTag)[CommPkgProperty] ?? '';
                const commPkgDesc = (item as SearchTag)[CommPkgDescriptionFromTag];
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
