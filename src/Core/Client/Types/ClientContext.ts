export interface ClientContext {
    facility: Facility;
    project: Project;
    fusionContext: FusionContext;
}

export interface Project {
    projectId: string;
}
export interface Facility {
    facilityId: string;
    procosysPlantId: string;
    fusionContextId: string;
    sapPlantId: string;
    title: string;
    parentFacility?: string;
    subFacilities?: string[];
}

export interface FusionContext {
    created: Date;
    externalId: string;
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    title: string;
    type: FusionContextType;
    updated: Date;
    value: ContextValue;
}

interface FusionContextType {
    id: string;
    isChildType: boolean;
    parentTypeIds: string[];
}

interface ContextValue {
    identity: string;
    parentFacility: string;
    sapPlant: string;
    schema: string;
    subFacilities: string[];
}
