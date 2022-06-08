import { TypedSelectOption } from '../../../../api/Search/searchType';
import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';
import { SearchReferences } from '../../../SearchReferences/SearchReferences';

export const ScopeChangeReferences = (): JSX.Element => {
    const { updateAtom, useAtomState } = scopeChangeFormAtomApi;
    const onChange = (newList: TypedSelectOption[]) =>
        updateAtom({
            references: newList.filter((v, i, a) => a.map((s) => s.value).indexOf(v.value) === i),
        });

    const references = useAtomState(({ references }) => references ?? []);

    return <SearchReferences onChange={onChange} references={references} />;
};
