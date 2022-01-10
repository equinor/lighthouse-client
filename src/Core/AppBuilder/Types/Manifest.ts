import { App } from './App';
import { AppGroups, Apps } from './AppGroupe';

export interface Manifests {
    apps: AppManifest[];
    appGroups: AppGroups;
}

type HEXColor = `#${string}`;

export interface AppManifest {
    title: string;
    shortName: string;
    color: HEXColor;
    groupe: Apps | Apps[];
    tags: string[];
    icon?: string | React.FC;
    uri?: string;
    imageUri?: string;
    app?: App;
}
