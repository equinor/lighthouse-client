import {
    AccessFunctionResult,
    CreatorComponent,
    CreatorManifest
} from '@equinor/lighthouse-fusion-modules';
import { httpClient } from '@equinor/portal-client';
import { FactoryOptions } from '../../../Core/WorkSpace/src';
import { openSidesheet } from '../../../packages/Sidesheet/Functions';
import { checkOptionsRequest } from '../api/ScopeChange/Access/optionsRequestChecker';
import { ScopeChangeCreateForm } from '../Components/DataCreator/DataCreatorWrapper';

export const dataCreator: FactoryOptions = {
    title: 'Scope change request',
    onClick: () => openSidesheet(ScopeChangeCreateForm, undefined),
    accessCheck: async (): Promise<boolean> => {
        const { scopeChange } = httpClient();
        const check = () => scopeChange.fetch('api/scope-change-requests', { method: 'OPTIONS' });
        return await (
            await checkOptionsRequest(check)
        ).canPost;
    },
};

export const changeCreatorManifest: CreatorManifest = {
    widgetId: 'changeCreator',
    widgetType: 'creator',
    title: 'Scope change request',
    color: '#7B3A96',
    props: {
        accessCheckFunctionId: 'changeCreatorAccess',
        parentApp: 'change',
    },
};

export const changeCreatorComponent: CreatorComponent = {
    widgetId: 'changeCreator',
    widgetType: 'creator',
    widget: ScopeChangeCreateForm,
};

export const changeCreatorAccessFunction: AccessFunctionResult = {
    functionId: 'changeCreatorAccess',
    function: async (): Promise<boolean> => {
        const { scopeChange } = httpClient();
        const check = () => scopeChange.fetch('api/scope-change-requests', { method: 'OPTIONS' });
        return await (
            await checkOptionsRequest(check)
        ).canPost;
    },
};
