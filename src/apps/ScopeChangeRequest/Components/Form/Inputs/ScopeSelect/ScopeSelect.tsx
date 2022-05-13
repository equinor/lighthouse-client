import { SingleSelect } from '@equinor/eds-core-react';
import { useQuery } from 'react-query';

import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';
import { scopeChangeQueries } from '../../../../keys/queries';

export const ScopeSelect = (): JSX.Element => {
    const { scopeQuery } = scopeChangeQueries;
    const { data: scopes } = useQuery(scopeQuery);

    const { useAtomState, updateAtom } = scopeChangeFormAtomApi;

    const scope = useAtomState(({ scope }) => scope);

    return (
        <SingleSelect
            items={scopes?.map(({ name }) => name) ?? []}
            label={'Scope'}
            meta="(Required)"
            value={scope?.name}
            placeholder="Select scope"
            disabled={false}
            handleSelectedItemChange={(change) => {
                !change.selectedItem
                    ? updateAtom({ scope: null })
                    : updateAtom({
                        scope: scopes?.find(({ name }) => name === change.selectedItem),
                    });
            }}
        />
    );
};
