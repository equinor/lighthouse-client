/* eslint-disable @typescript-eslint/no-empty-interface */
import { Configurator, initializeClientModules, ModulesInstance } from './modules';
export * from './DataCreatorModule';
export type { Configurator };

export interface AppManifest {}

export interface Lighthouse {
    /**
     * Configured services for Client
     */
    lighthouseModules: ModulesInstance;
    /**
     * Create a scoped instance of services
     */
    // createInstance: <TModule extends Module<any, any>>(
    //     configurator: ModulesConfigurator,
    //     modules: TModule[]
    // ) => Promise<ModuleType<Modules>>;
}

export const initLighthouse = async (init: Configurator): Promise<Lighthouse> => {
    const lighthouseModules = await initializeClientModules(init);
    const lighthouse = {
        lighthouseModules,
    };
    window.Lighthouse = lighthouse;
    return lighthouse;
};

declare global {
    interface Window {
        Lighthouse: Lighthouse;
    }
}

export default initLighthouse;
