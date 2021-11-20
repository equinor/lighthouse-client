import { THREE } from '@cognite/reveal';

export interface NodeSelectionData {
    treeIndex: number;
    position3D: THREE.Vector3 | null;
    hierarchyId: string;
}
