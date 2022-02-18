import { Report } from 'powerbi-client';
import { createPowerBiFilter, getSlicerData } from '.';
import { PowerBiFilter } from '../Types';
const HIDDEN_FILTER_PREFIX = 'xx';
/**
 * Get all slicer filters on mount and after a slicer filter is set.
 * Some filters may be removed after a slicer filter is set.
 */
export async function getFilters(reportInstance: Report): Promise<PowerBiFilter[]> {
    const page = await reportInstance.getActivePage();
    const visuals = await page.getVisuals();
    const slicers = visuals.filter((visual) => visual.type == 'slicer');
    const filters = await Promise.all(
        slicers.map(async (slicer) => {
            const slicerData = await getSlicerData(slicer);

            return createPowerBiFilter(slicerData);
        })
    );

    return filters.filter((f) => !f.type.startsWith(HIDDEN_FILTER_PREFIX));
}
