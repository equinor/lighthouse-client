import { TypedSelectOption } from '../../../../../ScopeChangeRequest/types/search/searchType';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';
import { SearchTags } from './SearchTags';

const { updateAtom, useAtomState } = DRCFormAtomApi;

const updateTags = (newVals: TypedSelectOption[]) => {
    updateAtom({ tags: newVals });
};

export const TagsInput = (): JSX.Element => {
    const tags = useAtomState((s) => s.tags) ?? [];

    return <SearchTags onChange={updateTags} tags={tags} />;
};
