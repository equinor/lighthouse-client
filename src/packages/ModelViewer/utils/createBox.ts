import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

export function createBox(
    name: string,
    { width, height, depth }: ObjectData
): Mesh<BoxGeometry, MeshBasicMaterial> {
    const geometry = new BoxGeometry(width, height, depth);
    const material = new MeshBasicMaterial({ color: 0x676767 });
    const cube = new Mesh(geometry, material);
    cube.name = name;
    return cube;
}

export interface ObjectData {
    width: number;
    height: number;
    depth: number;
}
