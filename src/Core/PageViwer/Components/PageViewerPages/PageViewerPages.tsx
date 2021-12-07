import { ViewState } from '../../Types/State';
import { Page, PageWrapper } from './PageViewerPagesStyles';

export interface Page {
    title: string;
    icon: React.FC;
    viewComponent: React.FC;
}

interface PageViewerPagesProps {
    pages: ViewState;
    activePage: number;
}

export const PageViewerPages = ({ pages, activePage }: PageViewerPagesProps): JSX.Element => {
    return (
        <PageWrapper>
            {Object.values(pages).map((page, index) => {
                if (page.type === 'Custom') {
                    const CustomPageComponent = page.component;
                    return (
                        <Page key={`panel-${page.title}`} style={{ paddingTop: 0 }}>
                            {activePage == index && <CustomPageComponent />}
                        </Page>
                    );
                }
                if (page.type === 'FusionPowerBi') {
                    return (
                        <Page key={`panel-${page.title}`} style={{ paddingTop: 0 }}>
                            {activePage == index && (
                                <p key={page.title}> FusionPowerBi {page.title}..</p>
                            )}
                        </Page>
                    );
                }
                if (page.type === 'PowerBi') {
                    return (
                        <Page key={`panel-${page.title}`} style={{ paddingTop: 0 }}>
                            {activePage == index && <p key={page.title}> PowerBi {page.title}..</p>}
                        </Page>
                    );
                }
            })}
        </PageWrapper>
    );
};
