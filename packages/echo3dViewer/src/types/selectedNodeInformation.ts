import { THREE } from '@cognite/reveal';
import { AabbModel } from '../services/generated/EchoHierarchyApiClient';

export interface SelectedNodeInformation {
    e3dTagNo?: string;
    referenceNo?: string;
    id?: number;
    refNoDb?: number;
    refNoSequence?: number;
    name?: string;
    discipline?: string;
    fullPath?: string[];
    tag?: string;
    system?: string;
    topNodeId?: number;
    parentId?: number;
    pdmsData?: { [key: string]: string };
    childrenIds?: number[];
    aabb?: AabbModel;
    diagnosticInfo?: string;
    point?: THREE.Vector3;
}
