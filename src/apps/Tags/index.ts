import { setupWorkspaceSidesheet } from '@equinor/WorkSpace';
import { TagDetail } from './Components/TagsDetails';
import { tagResolver } from './Functions/resolver';
import { Tag } from './Types/tag';

const sidesheetCreator = setupWorkspaceSidesheet<Tag, 'tagDetails'>({
  id: 'tagDetails',
  color: '#7B3A96',
  component: TagDetail,
  props: {
    objectIdentifier: 'TagNo',
    function: tagResolver,
  },
});

export const tagWidgetManifest = sidesheetCreator('SidesheetManifest');
export const tagWidgetComponent = sidesheetCreator('SidesheetComponentManifest');
export const tagResolverFunction = sidesheetCreator('ResolverFunction');
