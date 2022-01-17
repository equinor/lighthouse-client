import { App } from './App';
import { AppGroups } from './AppGroupe';

export interface Manifests {
    apps: AppManifest[];
    appGroups: AppGroups;
}

type HEXColor = `#${string}`;

export interface AppManifest {
    title: string;
    shortName: string;
    color: HEXColor;
    groupe: string | string[];
    tags: string[];
    icon?: string | React.FC;
    uri?: string;
    isProduction?: boolean;
    imageUri?: string;
    app?: App;
}
