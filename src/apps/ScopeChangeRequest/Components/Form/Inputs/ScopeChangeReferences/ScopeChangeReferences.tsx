import { TypedSelectOption } from '../../../../api/Search/searchType';
import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';
import { SearchReferences } from '../../../SearchReferences/SearchReferences';

export const ScopeChangeReferences = (): JSX.Element => {
    const { updateAtom, useAtomState } = scopeChangeFormAtomApi;
    const onChange = (newList: TypedSelectOption[]) =>
        updateAtom({
            //Remove duplicates
            references: newList.filter(
                (v, i, a) => a.map(({ value }) => value).indexOf(v.value) === i
            ),
        });

    const references = useAtomState(({ references }) => references ?? []);

    return <SearchReferences onChange={onChange} references={references} />;
};
