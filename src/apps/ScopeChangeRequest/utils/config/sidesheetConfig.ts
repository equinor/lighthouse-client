import { setupWorkspaceSidesheet } from '../../../../Core/WorkSpace/src/WorkSpaceApi/Functions/setupWorkspaceSidesheet';
import { SidesheetWrapper } from '../../Components/Sidesheet/SidesheetWrapper/SidesheetWrapper';
import { ScopeChangeRequest } from '../../types/scopeChangeRequest';
import { idResolver } from './dataOptions';

export const sidesheetCreator = setupWorkspaceSidesheet<ScopeChangeRequest, 'change'>({
    id: 'change',
    color: '#7B3A96',
    component: SidesheetWrapper,
    props: {
        objectIdentifier: 'id',
        parentApp: 'change',
        function: idResolver,
    },
});
export const changeSideSheetWidgetManifest = sidesheetCreator('SidesheetManifest');
export const changeSideSheetWidgetComponent = sidesheetCreator('SidesheetComponentManifest');
export const changeResolverFunction = sidesheetCreator('ResolverFunction');
