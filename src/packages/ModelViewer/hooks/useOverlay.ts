import { useCallback, useEffect, useState } from 'react';
import { getDomPositionFor3DPosition } from '../../../../packages/echo3dViewer/src/utils/cameraUtils';
import { useModelViewerContext } from '../context/modelViewerContext';

export function useOverlay() {
    const { viewerSelection, echo3DClient } = useModelViewerContext();

    const [overlayTags, setOverlayTags] = useState<
        {
            key: string;
            tagNo: string;
            domPosition: { left: string; top: string };
            position: THREE.Vector2 | undefined;
        }[]
    >([]);
    const handleOnCameraChange = useCallback(() => {
        if (echo3DClient) {
            const camera = echo3DClient.viewer.getCamera();
            const renderer = echo3DClient.viewer.renderer;

            const s: {
                tagNo: string;
                key: string;
                domPosition: { left: string; top: string };
                position: THREE.Vector2 | undefined;
            }[] = [];

            viewerSelection.forEach((vs, i) => {
                if (camera && renderer) {
                    const position = getDomPositionFor3DPosition(camera, renderer, vs.position);
                    if (position) {
                        position.x += renderer.domElement.offsetLeft;
                        position.y += renderer.domElement.offsetTop;
                        s.push({
                            key: `${vs.tagNo}_${i}`,
                            tagNo: vs.tagNo,
                            domPosition: {
                                top: `${position.y}px`,
                                left: `${position.x}px`,
                            },
                            position,
                        });
                    }
                }
            });
            setOverlayTags(s);
        }
    }, [echo3DClient, viewerSelection]);

    useEffect(() => {
        echo3DClient?.viewer.on('cameraChange', handleOnCameraChange);

        return () => {
            echo3DClient?.viewer.off('cameraChange', handleOnCameraChange);
        };
    }, [echo3DClient?.viewer, handleOnCameraChange]);

    return overlayTags;
}
