import { Echo3dMultiSelectionActions } from '@equinor/echo3dweb-viewer';

export async function selectTagsByTagNos(
    selection: Echo3dMultiSelectionActions,
    tags: string[],
    padding: number | undefined
): Promise<void> {
    await selection.setSelectionBasedOnE3dTagNos(tags);
    selection.clipSelection(true, padding);
    selection.fitCameraToCurrentBoundingBox();
    selection.setWhiteAppearance();
    selection.setSelectedColor();
}
