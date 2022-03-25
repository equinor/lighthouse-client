import { Page, Report } from 'powerbi-client';
import { useCallback, useState } from 'react';

/**
 * Will get the active page at first render.
 * If user changes page, it should be handled by `setActivePage`.
 */
export const useActivePage = (
    report?: Report
): [
    activePage: Page | undefined,
    setActivePage: (page: Page) => void,
    setActivePageByName: (name: string) => void
] => {
    const [activePage, setActivePage] = useState<Page>();

    const handleChange = useCallback(
        (page: Page) => {
            console.log(page);
            report?.setPage(page.name);
            // setActivePage(page);
        },
        [report]
    );
    const handlePageChange = useCallback(
        (name: string) => {
            report?.setPage(name);
        },
        [report]
    );

    // useEffect(() => {
    //     report &&
    //         !activePage &&
    //         report.on('rendered', async () => {
    //             try {
    //                 const active = await report.getActivePage();

    //                 setActivePage(active);
    //             } catch {
    //                 console.error('Cannot retrieve active page');
    //             }
    //         });
    // }, [activePage, report]);

    return [activePage, handleChange, handlePageChange];
};
