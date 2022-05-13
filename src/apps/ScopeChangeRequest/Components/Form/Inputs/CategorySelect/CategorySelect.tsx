import { SingleSelect } from '@equinor/eds-core-react';
import { useQuery } from 'react-query';

import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';
import { scopeChangeQueries } from '../../../../keys/queries';

export const CategorySelect = (): JSX.Element => {
    const { categoryQuery } = scopeChangeQueries;
    const { data: categories } = useQuery(categoryQuery);

    const { useAtomState, updateAtom } = scopeChangeFormAtomApi;

    const changeCategory = useAtomState(({ changeCategory }) => changeCategory);

    return (
        <SingleSelect
            items={categories?.map(({ name }) => name) ?? []}
            label={'Change category'}
            meta="(Required)"
            placeholder="Select category"
            value={changeCategory?.name}
            disabled={false}
            handleSelectedItemChange={(e) =>
                updateAtom({
                    changeCategory: categories?.find(({ name }) => name === e.selectedItem),
                })
            }
        />
    );
};
