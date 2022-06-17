import { TypedSelectOption } from '../../../../api/Search/searchType';
import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';
import { SearchReferences } from '../../../SearchReferences/SearchReferences';

const CommPkgProperty = 'McPkgsThroughScope__CommPkg__CommPkgNo';
const CommPkgDescriptionFromTag = 'McPkgsThroughScope__CommPkg__Description';

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
    return references
        .filter((s) => s.type === 'tag' && s.object[CommPkgProperty])
        .map((s): TypedSelectOption => {
            const commPkgNo = s.object[CommPkgProperty];
            const commPkgDesc = s.object[CommPkgDescriptionFromTag];

            return {
                label: `${commPkgNo} - ${commPkgDesc}`,
                value: commPkgNo,
                object: s,
                searchValue: commPkgNo,
                type: 'commpkg',
            };
        });
}
