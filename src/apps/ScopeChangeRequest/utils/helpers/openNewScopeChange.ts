import { openSidesheet } from '@equinor/sidesheet';
import { getScopeChangeById } from '../../api/ScopeChange/Request';
import { SidesheetWrapper } from '../../Components/Sidesheet/SidesheetWrapper/SidesheetWrapper';
import { changeSideSheetWidgetManifest } from '../config/sidesheetConfig';

export async function openNewScopeChange(scopeChangeId: string): Promise<void> {
    openSidesheet(
        SidesheetWrapper,
        await getScopeChangeById(scopeChangeId),
        changeSideSheetWidgetManifest
    );
}
