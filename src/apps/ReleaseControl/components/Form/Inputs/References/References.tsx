import { TypedSelectOption } from '../../../../../ScopeChangeRequest/api/Search/searchType';
import { SearchReferences } from '../../../../../ScopeChangeRequest/Components/SearchReferences/SearchReferences';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';

const { updateAtom, useAtomState } = DRCFormAtomApi;

let tags: string[] = [];
const updateReferences = (newVals: TypedSelectOption[]) => {
    tags = [];
    newVals.forEach((x) => {
        tags.push(x.value);
    });
    updateAtom({ tagNumbers: tags });
    updateAtom({ references: newVals });
};

export const ReferencesInput = (): JSX.Element => {
    const references = useAtomState((s) => s.references) ?? [];

    return <SearchReferences onChange={updateReferences} references={references} />;
};
