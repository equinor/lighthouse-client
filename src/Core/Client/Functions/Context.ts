import { updateGlobalClientState } from '../ClientState/ClientState';
import { ClientContext, Facility, FusionContext, Project } from '../Types/ClientContext';

function internalUpdateContext(
    update: ((context: ClientContext) => Partial<ClientContext>) | Partial<ClientContext>
) {
    updateGlobalClientState((state) => {
        const context = typeof update === 'function' ? update(state.context) : update;
        return {
            context: {
                ...state.context,
                ...context,
            },
        };
    });
}

function internalUpdateFacility(
    update: ((facility: Facility) => Partial<Facility>) | Partial<Facility>
) {
    internalUpdateContext((state) => {
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

function internalUpdateProject(
    update: ((project: Project) => Partial<Project>) | Partial<Project>
) {
    internalUpdateContext((state) => {
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

function internalUpdateFusionContext(
    update: ((project: FusionContext) => Partial<FusionContext>) | Partial<FusionContext>
) {
    internalUpdateContext((state) => {
        const fusionContext = typeof update === 'function' ? update(state.fusionContext) : update;
        return {
            ...state,
            fusionContext: {
                ...state.fusionContext,
                ...fusionContext,
            },
        };
    });
}

export function setSelectedFacility(facility: Partial<Facility>): void {
    internalUpdateFacility({
        ...facility,
    });
}

export function setSelectedProject(project: Partial<Project>): void {
    internalUpdateProject({ ...project });
}

export function setSelectedFusionContext(context: Partial<FusionContext>): void {
    internalUpdateFusionContext({ ...context });
}
