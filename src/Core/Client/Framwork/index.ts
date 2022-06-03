/* eslint-disable @typescript-eslint/no-empty-interface */
import { Configurator, initializeClientModules, ModulesInstance } from './modules';

export type { Configurator };

export interface AppManifest {}

export interface Client {
    /**
     * Configured services for Client
     */
    modules: ModulesInstance;
    /**
     * Create a scoped instance of services
     */
    // createInstance: <TModule extends Module<any, any>>(
    //     configurator: ModulesConfigurator,
    //     modules: TModule[]
    // ) => Promise<ModuleType<Modules>>;
}

export const initClient = async (init: Configurator): Promise<Client> => {
    const modules = await initializeClientModules(init);
    const client = {
        modules,
    };
    window.lighthouse = client;
    return client;
};

declare global {
    interface Window {
        lighthouse: Client;
    }
}

export default initClient;
