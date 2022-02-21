import { IClientContextConfigurator } from '.';
import { ClientContext, Facility, FusionContext, Project } from '../../../Types/ClientContext';
import { IGlobalStateProvider } from '../GlobalState/provider';

export interface IClientContextProvider {
    /**
     * Read an immutable state of the ClientSettings
     * @return {*}  {ClientSettings}
     */
    readClientContext(): Readonly<ClientContext>;

    /**
     * Updating the facility object.
     * @param {Partial<Facility>} facility
     */
    setSelectedFacility(facility: Partial<Facility>): void;

    /**
     * Updating the project object.
     * @param {Partial<Project>} project
     */
    setSelectedProject(project: Partial<Project>): void;

    /**
     * Updating the project fusionContext.
     * @param {Partial<FusionContext>} fusionContext
     */
    setSelectedFusionContext(fusionContext: Partial<FusionContext>): void;
}

export class ClientContextProvider implements IClientContextProvider {
    globalStateProvider: IGlobalStateProvider;
    clientContextConfigurator: IClientContextConfigurator;

    constructor(
        protected _clientContextConfigurator: IClientContextConfigurator,
        protected _globalStateProvider: IGlobalStateProvider
    ) {
        this.globalStateProvider = _globalStateProvider;
        this.clientContextConfigurator = _clientContextConfigurator;
    }

    readClientContext(): Readonly<ClientContext> {
        return this.globalStateProvider.readGlobalClientState((state) => state.context);
    }

    private updateContext(
        update: ((context: ClientContext) => Partial<ClientContext>) | Partial<ClientContext>
    ): void {
        this.globalStateProvider.updateGlobalClientState((state) => {
            const context = typeof update === 'function' ? update(state.context) : update;
            return {
                context: {
                    ...state.context,
                    ...context,
                },
            };
        });
    }

    private updateFacility(
        update: ((facility: Facility) => Partial<Facility>) | Partial<Facility>
    ): void {
        this.updateContext((state) => {
            const facility = typeof update === 'function' ? update(state.facility) : update;
            return {
                ...state,
                facility: {
                    ...state.facility,
                    ...facility,
                },
            };
        });
    }

    private updateProject(
        update: ((project: Project) => Partial<Project>) | Partial<Project>
    ): void {
        this.updateContext((state) => {
            const project = typeof update === 'function' ? update(state.project) : update;
            return {
                ...state,
                project: {
                    ...state.project,
                    ...project,
                },
            };
        });
    }

    private updateFusionContext(
        update: ((project: FusionContext) => Partial<FusionContext>) | Partial<FusionContext>
    ): void {
        this.updateContext((state) => {
            const fusionContext =
                typeof update === 'function' ? update(state.fusionContext) : update;
            return {
                ...state,
                fusionContext: {
                    ...state.fusionContext,
                    ...fusionContext,
                },
            };
        });
    }

    setSelectedFacility(facility: Partial<Facility>): void {
        this.updateFacility({
            ...facility,
        });
    }

    setSelectedProject(project: Partial<Project>): void {
        this.updateProject({ ...project });
    }

    setSelectedFusionContext(fusionContext: Partial<FusionContext>): void {
        this.updateFusionContext({ ...fusionContext });
    }
}
