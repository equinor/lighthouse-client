import { openSidesheet } from '@equinor/sidesheet';
import { FactoryOptions } from '@equinor/WorkSpace';
import { DisciplineReleaseControlFactoryComponent } from '../../components/Factory/FactoryComponent';

export const dataCreatorConfig: FactoryOptions = {
    title: 'Create release control workflow',
    accessCheck: () => Promise.resolve(true),
    // accessCheck: async (): Promise<boolean> => {
    //     const { scopeChange } = httpClient();
    //     const check = () => scopeChange.fetch('api/releasecontrol', { method: 'OPTIONS' });
    //     return await (
    //         await checkOptionsRequest(check)
    //     ).canPost;
    // },
    onClick: () => {
        openSidesheet(DisciplineReleaseControlFactoryComponent, undefined, 'piping-and-ht');
    },
};
