import { updateGlobalClientState } from '../ClientState/ClientState';
import { ClientContext, Facility, FusionContext, Project } from '../Types/ClientContext';

/**
 * This file contains internal state setter related to the Client Context,
 * And specified exported setters for `Facility`, `Project` and `FusionContext`
 */

export function internalUpdateContext(
    update: ((context: ClientContext) => Partial<ClientContext>) | Partial<ClientContext>
): void {
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

export function internalUpdateFacility(
    update: ((facility: Facility) => Partial<Facility>) | Partial<Facility>
): void {
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

export function internalUpdateProject(
    update: ((project: Project) => Partial<Project>) | Partial<Project>
): void {
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

export function internalUpdateFusionContext(
    update: ((project: FusionContext) => Partial<FusionContext>) | Partial<FusionContext>
): void {
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
