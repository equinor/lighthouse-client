import { ClientApi } from '@equinor/app-builder';
import { THREE, ThreeDContextProvider, ViewerInstance } from '@equinor/ThreeDViewer';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { threeD, ThreeDConfig, ThreeDInstance } from '../packages/ThreeDViewer/src/Api/threeD';
import { ObjectData } from '../packages/ThreeDViewer/src/Types/objectData';
import { status } from './mockData/status';

const Viewer = styled.div`
    height: 500px;
    > div {
        display: none;
    }
`;

export function createBox(name: string, { width, height, depth, matrix }: ObjectData) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ color: 0x676767 });
    const cube = new THREE.Mesh(geometry, material);
    const matrix4 = new THREE.Matrix4();
    matrix4.fromArray(matrix);
    cube.applyMatrix4(matrix4);
    cube.name = name;
    return cube;
}

async function setupBoxes(viewer: ViewerInstance) {
    const response = await fetch('./data/boxes.json');
    const data: Record<string, ObjectData[]> = await response.json();

    Object.keys(data).map((key) => {
        data[key].forEach((i) => {
            const cube = createBox(key, i);
            viewer.addObject3D(cube);
        });
    });
}

export function TestApp(appApi: ClientApi): JSX.Element {
    const viewerRef = useRef<HTMLDivElement>(null);
    const [threeDInstance, setThreeDInstance] = useState<ThreeDInstance>();

    useEffect(() => {
        async function setup() {
            if (viewerRef.current == null) return;

            const getToken = () =>
                appApi.authProvider.getAccessToken([
                    'd484c551-acf8-45bc-b1e8-3f4373bd0d42/user_impersonation',
                ]);
            const config: ThreeDConfig = {
                domElement: viewerRef.current,
                baseUrl: 'https://app-echomodeldist-dev.azurewebsites.net',
            };
            const instance = await threeD(config);
            const isAuthenticated = await instance.login(getToken);
            const geometryFilter = {
                boundingBox: new THREE.Box3(
                    new THREE.Vector3(80, 260, -1),
                    new THREE.Vector3(420, 340, 120)
                ),
            };

            function setStatus(
                now: number,
                to: number,
                data: Record<string, { status: string; date: Date }>
            ) {
                Object.keys(data).forEach((key) => {
                    if (data[key].status === 'OK') {
                        instance.setColorByName(key, '#0ff322');
                    } else {
                        let color = data[key].date.getTime() < now ? '#ff4400' : '#f3a30f';
                        if (data[key].date.getTime() > now && data[key].date.getTime() > to) {
                            color = '#0ff322';
                        }
                        instance.setColorByName(key, color);
                        console.log(key, color);
                    }
                });
            }

            setThreeDInstance(instance);
            setupBoxes(instance.viewer).then(() => {
                setStatus(
                    new Date('2021-08-01').getTime(),
                    new Date('2021-05-01').getTime(),
                    status
                );
            });
            instance.viewer.fitCameraToBoundingBox(
                new THREE.Box3(new THREE.Vector3(80, 260, -1), new THREE.Vector3(420, 340, 120)),
                0
            );

            // Loading Johan Castberg
            // if (isAuthenticated) {
            //     await instance.loadModel(114, 4, geometryFilter)
            // }
        }

        setup();
    }, [viewerRef]);

    return (
        <ThreeDContextProvider threeDInstance={threeDInstance}>
            <Viewer ref={viewerRef} />
        </ThreeDContextProvider>
    );
}
