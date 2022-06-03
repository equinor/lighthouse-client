import { setupCreator } from '@equinor/lighthouse-fusion-modules';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { checkOptionsRequest } from '../../api/releaseControl/Access/optionsRequestChecker';
import { DisciplineReleaseControlFactoryComponent } from '../../components/Factory/FactoryComponent';

const creator = setupCreator({
    widgetId: 'releaseCreator',
    title: 'Create release control workflow',
    color: '#7B3A96',
    widget: DisciplineReleaseControlFactoryComponent,
    props: {
        accessCheckFunctionId: 'releaseCreatorAccess',
        parentApp: 'release',
        function: async (): Promise<boolean> => {
            const { scopeChange } = httpClient();
            const check = () => scopeChange.fetch('api/releasecontrol', { method: 'OPTIONS' });
            return await (
                await checkOptionsRequest(check)
            ).canPost;
        },
    },
});

export const releaseCreatorManifest = creator('CreatorManifest');
export const releaseCreatorComponent = creator('CreatorComponent');
export const releaseCreatorAccessFunction = creator('AccessFunctionResult');
