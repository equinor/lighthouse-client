import { setupCreator } from '@equinor/lighthouse-fusion-modules';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { checkOptionsRequest } from '../api/ScopeChange/Access/optionsRequestChecker';
import { ScopeChangeCreateForm } from '../Components/DataCreator/DataCreatorWrapper';

const creator = setupCreator({
    widgetId: 'changeCreator',
    title: 'Scope change request',
    color: '#7B3A96',
    widget: ScopeChangeCreateForm,
    props: {
        accessCheckFunctionId: 'changeCreatorAccess',
        parentApp: 'change',
        function: async (): Promise<boolean> => {
            const { scopeChange } = httpClient();
            const check = () =>
                scopeChange.fetch('api/scope-change-requests', { method: 'OPTIONS' });
            return await (
                await checkOptionsRequest(check)
            ).canPost;
        },
    },
});

export const changeCreatorManifest = creator('CreatorManifest');
export const changeCreatorComponent = creator('CreatorComponent');
export const changeCreatorAccessFunction = creator('AccessFunctionResult');
