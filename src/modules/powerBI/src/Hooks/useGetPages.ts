import { Page, Report } from 'powerbi-client';
import { useEffect, useState } from 'react';

/**
 * Gets all pages for powerbi report
 * Will only change pages if pages is undefined because
 * report.setPage() will cause this to set the state every time
 * user changes a page.
 */
export const useGetPages = (report?: Report): { pages: Page[] | undefined } => {
    const [pages, setPages] = useState<Page[]>();

    useEffect(() => {
        const getPages = () => {
            report &&
                !pages &&
                report.on('rendered', async () => {
                    try {
                        const pbiPages = await report.getPages();
                        // Don't want to add the pages that should be hidden for user
                        const filteredPages = pbiPages.filter((page) => page.visibility !== 1);
                        setPages(filteredPages);
                    } catch {
                        console.error('Cannot retrieve pages');
                    }
                });
        };
        getPages();
    }, [report, pages]);

    return { pages };
};
