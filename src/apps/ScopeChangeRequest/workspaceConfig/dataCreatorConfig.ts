import { httpClient } from '@equinor/portal-client';
import { FactoryOptions } from '../../../Core/WorkSpace/src';
import { checkOptionsRequest } from '../api/ScopeChange/Access/optionsRequestChecker';
import { DataCreatorWrapper } from '../Components/DataCreator/DataCreatorWrapper';

export const dataCreator: FactoryOptions = {
    title: 'Scope change request',
    component: DataCreatorWrapper,
    accessCheck: async (): Promise<boolean> => {
        const { scopeChange } = httpClient();
        const check = () => scopeChange.fetch('api/scope-change-requests', { method: 'OPTIONS' });
        return await (
            await checkOptionsRequest(check)
        ).canPost;
    },
};
