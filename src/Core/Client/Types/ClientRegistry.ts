import { AppGroups } from './AppGroupe';
import { AppManifest } from './AppManifest';

export type ClientRegistry = {
  apps: AppManifest[];
  appGroups: AppGroups;
};
