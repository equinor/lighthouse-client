import { PowerBI } from '../../../../modules/powerBI';
import { PageConfig, ViewState } from '../../Types/State';
import { Page, PageWrapper } from './PageViewerPagesStyles';

export interface Page {
    title: string;
    icon: React.FC;
    viewComponent: React.FC;
}

interface PageViewerPagesProps {
    viewState: ViewState;
    activePage: number;
}

export const PageViewerPages = ({ viewState, activePage }: PageViewerPagesProps): JSX.Element => {
    return (
        <PageWrapper>
            {Object.keys(viewState.pages).map((key: string, index) => {
                const page: PageConfig = viewState.pages[key];
                if (page.type === 'Custom') {
                    const CustomPageComponent = page.component;
                    return (
                        <Page key={`panel-${key}`} style={{ paddingTop: 0 }}>
                            {activePage == index && <CustomPageComponent />}
                        </Page>
                    );
                }
                if (page.type === 'FusionPowerBi') {
                    return (
                        <Page key={`panel-${key}`} style={{ paddingTop: 0 }}>
                            {activePage == index && (
                                <PowerBI reportUri={page.reportURI} filterOptions={page.filter} />
                            )}
                        </Page>
                    );
                }
                if (page.type === 'PowerBi') {
                    return (
                        <Page key={`panel-${key}`} style={{ paddingTop: 0 }}>
                            {activePage == index && <p key={page.title}> PowerBi {page.title}..</p>}
                        </Page>
                    );
                }
            })}
        </PageWrapper>
    );
};
