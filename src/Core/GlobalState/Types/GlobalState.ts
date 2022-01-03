import { AuthenticationProvider } from '@equinor/authentication';
import { AppConfig } from '@equinor/lighthouse-conf';

export interface GlobalState {
    selectedPlant?: Plant;
    authProvider?: AuthenticationProvider;
    clientConfig?: AppConfig;
    selectedItems?: Record<string, any>;
}

export interface Plant {
    instCode: string;
    description: string;
    sapPlantId: string;
    procosysPlantId: string;
}
