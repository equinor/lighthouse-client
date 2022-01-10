import { Apps } from '../../../apps/apps';

export type AppGroups = Record<Apps, AppGroupe>;

export interface AppGroupe {
    name: string;
    icon: string | React.FC;
}
