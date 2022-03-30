import { FusionPowerBiOptions, Page } from '../Types/State';

interface DefaultResult {
    report?: FusionPowerBiOptions;
    page?: Page;
}

/**
 * Function  used to return det default or fist report registered. plus default page.
 * all can be undefined.
 *
 * @param {FusionPowerBiOptions[]} reports A list of alle reports registered.
 * @return {*}  {DefaultResult}
 */
export function getDefault(reports: FusionPowerBiOptions[]): DefaultResult {
    let page: Page | undefined = undefined;
    let report = reports.find((report) => {
        page = report.pages.find((p) => p.default);
        return page?.default;
    });

    if (!report) {
        report = reports[0];
    }

    return {
        report,
        page,
    };
}
