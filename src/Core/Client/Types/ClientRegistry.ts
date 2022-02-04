import { AppGroups } from './AppGroupe';
import { AppManifest } from './AppManifest';

export interface ClientRegistry {
    apps: AppManifest[];
    appGroups: AppGroups;
}
