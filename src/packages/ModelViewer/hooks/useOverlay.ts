import { AabbModel, getDomPositionFor3DPosition } from '@equinor/echo3dweb-viewer';
import { useCallback, useEffect, useState } from 'react';
import { useModelViewerContext } from '../context/modelViewerContext';

interface DomPosition {
    left: string;
    top: string;
}

interface OverlayTags {
    key: string;
    tagNo: string;
    domPosition: DomPosition;
    position: THREE.Vector2;
    aabb: AabbModel;
    boundingBox: THREE.Box3;
}

export function useOverlay(): OverlayTags[] {
    const { viewerNodeSelection: viewerSelection, echo3DClient } = useModelViewerContext();

    const [overlayTags, setOverlayTags] = useState<OverlayTags[]>([]);
    const handleOnCameraChange = useCallback(() => {
        if (echo3DClient) {
            const camera = echo3DClient.viewer.getCamera();
            const renderer = echo3DClient.viewer.renderer;

            const newOverlayTags: OverlayTags[] = [];

            viewerSelection.forEach((vs, i) => {
                if (camera && renderer) {
                    const position = getDomPositionFor3DPosition(camera, renderer, vs.position);

                    if (position) {
                        position.x += renderer.domElement.offsetLeft;
                        position.y += renderer.domElement.offsetTop;

                        const hasOverlayingTags = newOverlayTags.filter((overlayTag) =>
                            position.x < overlayTag.position.x + 100 &&
                            position.x > overlayTag.position.x - 100
                                ? true
                                : false
                        );

                        hasOverlayingTags &&
                            position.set(position.x - 50 * hasOverlayingTags.length, position.y);

                        newOverlayTags.push({
                            key: `${vs.tagNo}_${i}`,
                            tagNo: vs.tagNo,
                            domPosition: {
                                top: `${position.y}px`,
                                left: `${position.x}px`,
                            },

                            position,
                            aabb: vs.aabb,
                            boundingBox: vs.boundingBox,
                        });
                    }
                }
            });

            setOverlayTags(newOverlayTags);
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
