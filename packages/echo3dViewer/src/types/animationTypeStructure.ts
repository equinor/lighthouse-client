import { THREE } from '@cognite/reveal';

export interface AnimationTypeStructure {
    x: number;
    y: number;
    z: number;
    targetX: number;
    targetY: number;
    targetZ: number;
}

/**
 * Mapper function that will turn a position and a target into an AnimationTypeStructure
 *
 * @param {THREE.Vector3} position the position to map
 * @param {THREE.Vector3} target the target to map
 * @returns {AnimationTypeStructure} the mapped AnimationTypeStructure
 */
export const animationTypeStructureMapper = (position: THREE.Vector3, target: THREE.Vector3) => {
    return {
        x: position.x,
        y: position.y,
        z: position.z,
        targetX: target.x,
        targetY: target.y,
        targetZ: target.z
    };
};
