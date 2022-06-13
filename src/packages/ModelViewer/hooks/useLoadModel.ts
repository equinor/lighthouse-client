import { Echo3dMultiSelectionActions } from '@equinor/echo3dweb-viewer';
import { useEffect, useRef } from 'react';
import { useModelViewerContext } from '../context/modelViewerContext';
import { geometryFilter } from '../utils/geometryFilter';

export function useModel(loadFullModel?: boolean, tags?: string[], padding?: number): void {
    const { echo3DClient, currentPlant, setModelWithSelection, selection } =
        useModelViewerContext();
    const initialSetupDone = useRef(false);

    useEffect(() => {
        const selectionOptions = {
            isLoading: false,
            isCropped: true,
            hasDefaultColor: false,
            modelIsVisible: false,
            message: undefined,
            padding,
        };

        if (echo3DClient && currentPlant && !initialSetupDone.current) {
            (async () => {
                const cognite3DModel = await echo3DClient.viewer.addCadModel({
                    modelId: currentPlant.id,
                    revisionId: currentPlant.revisionNumber,
                    geometryFilter,
                });
                const selection = new Echo3dMultiSelectionActions(
                    echo3DClient.viewer,
                    cognite3DModel,
                    currentPlant.hierarchyId
                );

                if (tags) {
                    await selection.setSelectionBasedOnE3dTagNos(tags);

                    selection.clipSelection(true, padding);
                    selection.fitCameraToCurrentBoundingBox();
                    selection.setWhiteAppearance();
                    selection.setSelectedColor();

                    setModelWithSelection({
                        cognite3DModel,
                        selection,
                        viewerSelection: selection.viewerSelection,
                        ...selectionOptions,
                    });
                } else {
                    setModelWithSelection({ cognite3DModel, selection });
                }
                if (loadFullModel) {
                    echo3DClient.viewer.fitCameraToModel(cognite3DModel);
                }
                initialSetupDone.current = true;
            })();
        }

        if (selection && tags && initialSetupDone.current) {
            (async () => {
                selection.clearSelection();
                await selection.setSelectionBasedOnE3dTagNos(tags);

                selection.clipSelection(true, padding);
                selection.fitCameraToCurrentBoundingBox();
                selection.setWhiteAppearance();
                selection.setSelectedColor();

                setModelWithSelection({
                    ...selectionOptions,
                    viewerSelection: selection.viewerSelection,
                });
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [echo3DClient, currentPlant, tags?.toString()]);
}
