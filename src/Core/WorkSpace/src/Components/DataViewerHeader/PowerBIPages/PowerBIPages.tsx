import { useGetPages } from '@equinor/lighthouse-powerbi';
import { useViewerContext } from '../../../Context/ViewProvider';
import { TabButton } from '../../ToggleButton';
import { TabTitle, FillSection } from '../HeaderStyles';

export const PowerBiPages = (): JSX.Element => {
    const { setActivePage, activePage, pbiReport } = useViewerContext();
    const { pages } = useGetPages(pbiReport);
    return (
        <>
            {pages &&
                pages.map((page) => {
                    return (
                        <TabButton
                            width={`${page.displayName.length * 10}px`}
                            aria-selected={
                                (activePage?.pageId && page.name === activePage.pageId) ||
                                page.displayName === activePage?.pageTitle ||
                                false
                            }
                            key={`pages-${page.name}`}
                            onClick={() =>
                                setActivePage({ pageId: page.name, pageTitle: page.displayName })
                            }
                        >
                            <TabTitle>{page.displayName}</TabTitle>
                        </TabButton>
                    );
                })}
            <FillSection />
        </>
    );
};
