import { Configurator, initializeWorkspaceModules, ModulesInstance } from './modules';

export type { Configurator };

export interface Workspace {
    /**
     * Configured services for workspaceClient
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

export const workspaceClient = async (init: Configurator): Promise<Workspace> => {
    const modules = await initializeWorkspaceModules(init);
    const client = {
        modules,
    };

    return client;
};

declare global {
    interface Window {
        Workspace: Workspace;
    }
}

export default workspaceClient;

workspaceClient(async (c) => {
    c.workspaceLoader.configure({ loaderUri: '// some uri' });
    c.onAfterConfiguration((cb)=> {
        c.workspaceLoader.
    })
});
