import { setupCreator } from '@equinor/lighthouse-fusion-modules';
import { DisciplineReleaseControlFactoryComponent } from '../../Components/Factory/FactoryComponent';

const creator = setupCreator({
    widgetId: 'htCreator',
    widgetType: 'creator',
    title: 'Create release control workflow',
    color: '#7B3A96',
    widget: DisciplineReleaseControlFactoryComponent,
    props: {
        accessCheckFunctionId: 'htCreatorAccess',
        parentApp: 'piping-and-ht',
        function: async () => Promise.resolve(false),
    },
});

export const htCreatorManifest = creator('CreatorManifest');
export const htCreatorComponent = creator('CreatorComponent');
export const htCreatorAccessFunction = creator('AccessFunctionResult');
