import { setupCreator } from '@equinor/lighthouse-fusion-modules';
import { DisciplineReleaseControlFactoryComponent } from '../../components/Factory/FactoryComponent';

const creator = setupCreator({
    widgetId: 'releaseCreator',
    title: 'Create release control workflow',

    color: '#7B3A96',
    widget: DisciplineReleaseControlFactoryComponent,
    props: {
        accessCheckFunctionId: 'htCreatorAccess',
        parentApp: 'release',
        function: async () => Promise.resolve(false),
    },
});

export const releaseCreatorManifest = creator('CreatorManifest');
export const releaseCreatorComponent = creator('CreatorComponent');
export const releaseCreatorAccessFunction = creator('AccessFunctionResult');
