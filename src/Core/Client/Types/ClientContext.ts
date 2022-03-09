export interface Project {
    projectId: string;
}
export interface ClientContext extends Facility {
    project: Project;
    fusionContext?: FusionContext | undefined;
}

export interface Facility {
    facilityId: string;
    procosysPlantId: string;
    fusionContextId: string;
    sapPlantId: string;
    echoPlantId: string;
    title: string;
}

export interface FusionContext {
    created: string;
    externalId: string;
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    title: string;
    type: FusionContextType;
    updated: string;
    value?: ContextValue;
}

interface FusionContextType {
    id: string;
    isChildType: boolean;
    parentTypeIds: string[];
}

interface ContextValue {
    identity: string;
    parentFacility: string | undefined;
    sapPlant: string;
    schema: string;
    subFacilities: string[];
}
