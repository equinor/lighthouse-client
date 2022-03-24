import { User } from '@microsoft/microsoft-graph-types';

export interface ClientSettings {
    logging: boolean;
    isProduction: boolean;
    clientEnv: string;
    user?: User;
    userImageUrl?: string;
}
