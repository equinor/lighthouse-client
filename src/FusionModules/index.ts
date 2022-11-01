/* eslint-disable @typescript-eslint/no-empty-interface */
import { Configurator, initializeClientModules, ModulesInstance } from './modules';
export * from './DataCreatorModule';
export * from './DataCreatorReact';
export type { Configurator };

export interface Lighthouse {
    /**
     * Configured services for Client
     */
    lighthouseModules: ModulesInstance;
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
