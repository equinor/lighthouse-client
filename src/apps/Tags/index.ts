import { setupWorkspaceSidesheet } from '../../Core/WorkSpace/src/WorkSpaceApi/Functions/setupWorkspaceSidesheet';

import { TagDetail } from './Components/TagsDetails';
import { tagResolver } from './Functions/resolver';
import { Tag } from './Types/tag';

const sidesheetCreator = setupWorkspaceSidesheet<Tag, 'tagDetails'>({
    id: 'tagDetails',
    color: '#7B3A96',
    component: TagDetail,
    props: {
        objectIdentifier: 'tagNo',
        function: tagResolver,
    },
});

export const tagWidgetManifest = sidesheetCreator('SidesheetManifest');
export const tagWidgetComponent = sidesheetCreator('SidesheetComponentManifest');
export const tagResolverFunction = sidesheetCreator('ResolverFunction');
