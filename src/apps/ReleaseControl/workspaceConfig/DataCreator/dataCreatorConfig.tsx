import { httpClient } from '@equinor/lighthouse-portal-client';
import { openSidesheet } from '@equinor/sidesheet';
import { FactoryOptions } from '@equinor/WorkSpace';
import { checkOptionsRequest } from '../../api/releaseControl/Access/optionsRequestChecker';
import { DisciplineReleaseControlFactoryComponent } from '../../components/Factory/FactoryComponent';

export const dataCreatorConfig: FactoryOptions = {
    title: 'Create release control workflow',
    accessCheck: async (): Promise<boolean> => {
        const { scopeChange } = httpClient();
        const check = () => scopeChange.fetch('api/releasecontrol', { method: 'OPTIONS' });
        return await (
            await checkOptionsRequest(check)
        ).canPost;
    },
    onClick: () => {
        openSidesheet(DisciplineReleaseControlFactoryComponent, undefined, 'piping-and-ht');
    },
};
