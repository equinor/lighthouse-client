import { openSidesheet } from '@equinor/sidesheet';
import { FactoryOptions } from '@equinor/WorkSpace';
import { DisciplineReleaseControlFactoryComponent } from '../../components/Factory/FactoryComponent';

export const dataCreatorConfig: FactoryOptions = {
    title: 'Create release control workflow',
    accessCheck: () => Promise.resolve(true),
    onClick: () => {
        openSidesheet(DisciplineReleaseControlFactoryComponent, undefined, 'piping-and-ht');
    },
};
