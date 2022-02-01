import { Page, Report } from 'powerbi-client';
import { useCallback, useEffect, useState } from 'react';

/**
 * Will get the active page at first render.
 * If user changes page, it should be handled outside of the hook (setActivePage)
 * @param report
 * @returns
 */
export const useActivePage = (
    report?: Report
): [activePage: Page | undefined, setActivePage: (page: Page) => void] => {
    const [activePage, setActivePage] = useState<Page>();

    const handleChange = useCallback(
        (page: Page) => {
            report?.setPage(page.name);
            setActivePage(page);
        },
        [report]
    );

    useEffect(() => {
        report &&
            !activePage &&
            report.on('rendered', async () => {
                try {
                    const active = await report.getActivePage();

                    setActivePage(active);
                } catch {
                    console.error('Cannot retrieve active page');
                }
            });
    }, [activePage, report]);

    return [activePage, handleChange];
};
