import { Report } from 'powerbi-client';
import { useEffect } from 'react';

/**
 * Gets all pages for powerbi report
 * Will only change pages if pages is undefined because
 * report.setPage() will cause this to set the state every time
 * user changes a page.
 */
export const useGetPages = (report?: Report, isDev?: boolean): void => {
    useEffect(() => {
        const getPages = () => {
            report &&
                report.on('rendered', async () => {
                    try {
                        const pbiPages = await report.getPages();
                        // Don't want to add the pages that should be hidden for user
                        const filteredPages = pbiPages.filter((page) => page.visibility !== 1);

                        console.log(
                            filteredPages?.map((p) => ({
                                pageTitle: p.displayName,
                                pageId: p.name,
                            }))
                        );
                    } catch {
                        console.error('Cannot retrieve pages');
                    }
                });
        };
        if (isDev) {
            getPages();
        }
    }, [isDev, report]);
};
