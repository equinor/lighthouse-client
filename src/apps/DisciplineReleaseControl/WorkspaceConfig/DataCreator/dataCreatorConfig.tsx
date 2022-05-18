import { openSidesheet } from '@equinor/sidesheet';
import { FactoryOptions } from '@equinor/WorkSpace';
import { DisciplineReleaseControlFactoryComponent } from '../../Components/Factory/FactoryComponent';

export const dataCreatorConfig: FactoryOptions = {
    title: 'Create release control workflow',
    accessCheck: () => Promise.resolve(false),
    onClick: () => {
        openSidesheet(DisciplineReleaseControlFactoryComponent, undefined, 'piping-and-ht');
    },
};
