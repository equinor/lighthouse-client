import { THREE } from '@cognite/reveal'; // NOTE! Import THREE from @reveal in order to ensure same version!
/**
 * @param {THREE.Object3D} node The node to check
 * @returns {boolean} Is it a sector node?
 */
export function isSectorNode(node: THREE.Object3D): boolean {
    return !!node.name.match(/^Sector \d+$/);
}
