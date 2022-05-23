import { setupCreator } from '@equinor/lighthouse-fusion-modules';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { checkOptionsRequest } from '../api/ScopeChange/Access/optionsRequestChecker';
import { ScopeChangeCreateForm } from '../Components/DataCreator/DataCreatorWrapper';

const changeCreator = setupCreator({
    widgetId: 'changeCreator',
    widgetType: 'creator',
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
            return (await (await checkOptionsRequest(check)).canPost) || true;
        },
    },
});

export const changeCreatorManifest = changeCreator('CreatorManifest');
export const changeCreatorComponent = changeCreator('CreatorComponent');
export const changeCreatorAccessFunction = changeCreator('AccessFunctionResult');
