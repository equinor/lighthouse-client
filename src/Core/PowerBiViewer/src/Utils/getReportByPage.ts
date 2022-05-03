import { FusionPowerBiOptions, Page } from '../Types/State';

/**
 * @param {Page} selectedPage
 * @param {FusionPowerBiOptions[]} reports
 * @return {*}  {(FusionPowerBiOptions | undefined)}
 */
export function getReportByPage(
    selectedPage: Partial<Page>,
    reports: FusionPowerBiOptions[]
): FusionPowerBiOptions | undefined {
    if (!selectedPage?.pageTitle || !selectedPage?.pageId) {
        return undefined;
    }
    // return reports.find((r) => r.pages.includes(selectedPage));
    const report = reports.find((report) =>
        report.pages.find(
            (page) =>
                page.pageId === selectedPage.pageId ||
                page.pageTitle.startsWith(selectedPage.pageTitle!)
        )
    );
    return report;
}
