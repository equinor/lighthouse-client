import { httpClient } from '@equinor/portal-client';

import { FactoryOptions } from '../../../Core/WorkSpace/src';
import { openSidesheet } from '../../../packages/Sidesheet/Functions';
import { checkOptionsRequest } from '../api/ScopeChange/Access/optionsRequestChecker';
import { ScopeChangeCreateForm } from '../Components/DataCreator/DataCreatorWrapper';

export const dataCreator: FactoryOptions = {
    title: 'Scope change request',
    onClick: () => openSidesheet(ScopeChangeCreateForm, undefined, 'change'),
    accessCheck: async (): Promise<boolean> => {
        const { scopeChange } = httpClient();
        const check = () => scopeChange.fetch('api/scope-change-requests', { method: 'OPTIONS' });
        return await (
            await checkOptionsRequest(check)
        ).canPost;
    },
};
