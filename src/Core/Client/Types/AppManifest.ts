import { App } from './App';

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
    app?: App;
}
