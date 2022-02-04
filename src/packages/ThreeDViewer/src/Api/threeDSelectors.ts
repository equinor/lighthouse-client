/**
 *  Custom Selector events that can be added to the events.
 *  The event is used fo selecting any objects in the 3D scene.
 *  The Cognite3DViewer does not support selection of all types of objects,
 *  hence the implementation if this event.
 */

import { THREE } from '@cognite/reveal';
import { ThreeDApiOptions } from './threeD';

export type IntersectedObjectEvent = { offsetX: number; offsetY: number };
export type GetIntersectedObject = (
    event: IntersectedObjectEvent
) => THREE.Object3D<THREE.Event> | undefined;

function getPointerOnScreen(
    event: IntersectedObjectEvent,
    divElement: HTMLDivElement
) {
    const pointer = new THREE.Vector2();
    pointer.x = (event.offsetX / divElement.clientWidth) * 2 - 1;
    pointer.y = -(event.offsetY / divElement.clientHeight) * 2 + 1;
    return pointer;
}

function createGetIntersectedObject(
    scene: THREE.Scene,
    camera: THREE.Camera,
    divElement: HTMLDivElement
): GetIntersectedObject {
    return (
        event: IntersectedObjectEvent
    ): THREE.Object3D<THREE.Event> | undefined => {
        const pointer = getPointerOnScreen(event, divElement);
        const rayCaster = new THREE.Raycaster();

        rayCaster.setFromCamera(pointer, camera);
        const intersects = rayCaster.intersectObjects(scene.children, false);
        if (intersects[0]) {
            return intersects[0].object;
        }

        return undefined;
    };
}

function createGetIntersectedObjectName(
    getIntersectedObject: GetIntersectedObject
) {
    return (event: { offsetX: number; offsetY: number }) => {
        const object = getIntersectedObject(event);
        if (!object) return '';
        return object.name;
    };
}

export function selectorEventsApi(
    scene: THREE.Scene,
    camera: THREE.Camera,
    divElement: HTMLDivElement
) {
    const getIntersectedObject = createGetIntersectedObject(
        scene,
        camera,
        divElement
    );
    const getIntersectedObjectName =
        createGetIntersectedObjectName(getIntersectedObject);

    return {
        getIntersectedObject,
        getIntersectedObjectName
    };
}

/**
 *  Selector Functions
 */

function createGetObjectByName(scene: THREE.Scene) {
    return (name: string): THREE.Object3D<THREE.Event> | undefined => {
        let object: THREE.Object3D<THREE.Event> | undefined = undefined;

        scene.traverse((child: THREE.Object3D<THREE.Event>) => {
            if (object) return object;
            if (child.name.toLocaleLowerCase() === name.toLocaleLowerCase())
                object = child;
        });

        return object;
    };
}

function createGetObjectsByName(scene: THREE.Scene) {
    return (name: string): THREE.Object3D<THREE.Event>[] => {
        const objects: THREE.Object3D<THREE.Event>[] = [];

        scene.traverse((child: THREE.Object3D<THREE.Event>) => {
            if (child.name.toLocaleLowerCase() === name.toLocaleLowerCase())
                objects.push(child);
        });

        return objects;
    };
}

export type RGB = {
    r: number;
    g: number;
    b: number;
};

function createGetObjectColorByName(scene: THREE.Scene) {
    return (name: string): RGB => {
        const child: any = scene.children.find(
            (child) =>
                child.name.toLocaleLowerCase() === name.toLocaleLowerCase()
        );
        return child?.material.color;
    };
}

export function ThreeDSelectorApi({ scene }: ThreeDApiOptions) {
    return {
        getObjectByName: createGetObjectByName(scene),
        getObjectsByName: createGetObjectsByName(scene),
        getObjectColorByName: createGetObjectColorByName(scene)
    };
}
