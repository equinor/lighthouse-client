import { App } from './App';

type HEXColor = `#${string}`;

type AppEnvironment = 'dev' | 'test' | 'prod';

export interface AppManifest {
    title: string;
    shortName: string;
    color: HEXColor;
    groupe: string;
    tags: string[];
    icon?: string | React.FC;
    uri?: (isProduction: boolean) => string;
    appEnv?: AppEnvironment;
    app?: App;
    helpPageUrl?: string;
}
