import { Facility, FusionContext, Project } from '../Types/ClientContext';
import {
    internalUpdateFacility,
    internalUpdateFusionContext,
    internalUpdateProject
} from './internal';

/**
 * Updating the facility object.
 * @param {Partial<Facility>} facility
 */
export function setSelectedFacility(facility: Partial<Facility>): void {
    internalUpdateFacility({
        ...facility,
    });
}

/**
 * Updating the project object.
 * @param {Partial<Project>} project
 */
export function setSelectedProject(project: Partial<Project>): void {
    internalUpdateProject({ ...project });
}

/**
 * Updating the project fusionContext.
 * @param {Partial<FusionContext>} fusionContext
 */
export function setSelectedFusionContext(fusionContext: FusionContext): void {
    internalUpdateFusionContext(fusionContext);
}
