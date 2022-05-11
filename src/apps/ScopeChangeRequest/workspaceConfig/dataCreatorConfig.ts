import { httpClient } from '@equinor/portal-client';

import { FactoryOptions } from '../../../Core/WorkSpace/src';
import { openSidesheet } from '../../../packages/Sidesheet/Functions';
import { checkOptionsRequest } from '../api/ScopeChange/Access/optionsRequestChecker';
import { SidesheetWrapper } from '../Components/Sidesheet/SidesheetWrapper/SidesheetWrapper';

export const dataCreator: FactoryOptions = {
    title: 'Scope change request',
    onClick: () => openSidesheet(SidesheetWrapper, undefined, 'change'),
    accessCheck: async (): Promise<boolean> => {
        const { scopeChange } = httpClient();
        const check = () => scopeChange.fetch('api/scope-change-requests', { method: 'OPTIONS' });
        return await (
            await checkOptionsRequest(check)
        ).canPost;
    },
};
