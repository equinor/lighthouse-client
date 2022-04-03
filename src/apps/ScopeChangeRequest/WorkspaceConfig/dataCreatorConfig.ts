import { httpClient } from '@equinor/portal-client';
import { FactoryOptions } from '../../../Core/WorkSpace/src';
import { checkOptionsRequest } from '../Api/ScopeChange/Access/optionsRequestChecker';
import { DataCreatorWrapper } from '../Components/Form/DataCreatorWrapper';

export const dataCreator: FactoryOptions = {
    title: 'Scope change',
    component: DataCreatorWrapper,
    accessCheck: async () => {
        const { scopeChange } = httpClient();
        const check = () => scopeChange.fetch('/api/scope-change-requests', { method: 'OPTIONS' });
        return await (
            await checkOptionsRequest(check)
        ).canPost;
    },
};
