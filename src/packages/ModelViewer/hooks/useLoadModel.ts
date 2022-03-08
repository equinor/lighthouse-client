import { useEffect } from 'react';
import { useModelViewerContext } from '../context/modelViewer';
import { geometryFilter } from '../utils/geometryFilter';

export function useModel(loadFullModel?: boolean): void {
    const { echo3DClient, currentPlant, setModel } = useModelViewerContext();

    useEffect(() => {
        if (echo3DClient && currentPlant) {
            (async () => {
                const model = await echo3DClient.viewer.addCadModel({
                    modelId: currentPlant.id,
                    revisionId: currentPlant.revisionNumber,
                    geometryFilter,
                });
                setModel(model);
                if (loadFullModel) {
                    echo3DClient.viewer.fitCameraToModel(model);
                }
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [echo3DClient, currentPlant]);
}
