import { useViewerContext } from '../../../Context/ViewProvider';
import { TabButton } from '../../ToggleButton';
import { TabTitle, FillSection } from '../HeaderStyles';

export const PowerBiPages = (): JSX.Element => {
    const { pages, setActivePage, activePage } = useViewerContext();

    return (
        <>
            {pages.map((page) => {
                return (
                    <TabButton
                        width={`${page.pageTitle.length * 10}px`}
                        aria-selected={
                            (activePage?.pageId &&
                                page.pageId === activePage.pageId &&
                                page.pageTitle === page.pageTitle) ||
                            false
                        }
                        key={`pages-${page.pageId}`}
                        onClick={() => setActivePage(page)}
                    >
                        <TabTitle>{page.pageTitle}</TabTitle>
                    </TabButton>
                );
            })}
            <FillSection />
        </>
    );
};
