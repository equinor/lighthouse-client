import { Cognite3DModel } from '@cognite/reveal';

/**
 * ModelData connects the Cognite3DModel with the Echo required metadata.
 */
export interface ModelData {
    modelId: number;
    revisionId: number;
    hierarchyId: string;
    model: Cognite3DModel;
}
