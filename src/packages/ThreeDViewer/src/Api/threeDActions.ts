import { THREE } from '@cognite/reveal';
import { ViewerInstance } from '../Context/3DContextProvider';
import { ThreeDApiOptions } from './threeD';

type Color = `#${number}`;
type ColorFunc = () => Color;

function createSetColorByName(scene: THREE.Scene, viewer: ViewerInstance) {
    return (name: string, color: string | ColorFunc): void => {
        const currentColor = typeof color === 'function' ? color() : color;

        scene.traverse((child: any) => {
            if (child.name.toLocaleLowerCase() === name.toLocaleLowerCase())
                child.material = new THREE.MeshBasicMaterial({
                    color: currentColor,
                    name
                });
        });
        viewer.requestRedraw();
    };
}

export function threeDActionsApi({ scene, viewer }: ThreeDApiOptions) {
    return {
        setColorByName: createSetColorByName(scene, viewer)
    };
}
