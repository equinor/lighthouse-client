import { AppGroups, AppManifest } from '../../AppBuilder/Types';

export interface ClientRegistry {
    apps: AppManifest[];
    appGroups: AppGroups;
}
