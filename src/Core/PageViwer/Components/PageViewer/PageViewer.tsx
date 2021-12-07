import { Tabs } from '@equinor/eds-core-react';
import { useState } from 'react';
import { ViewState } from '../../Types/State';
import { NoPages } from '../NoDataViewer/NoPages';
import { PageViewerHeader } from '../PageViewerHeader/PageViewerHeader';
import { PageViewerPages } from '../PageViewerPages/PageViewerPages';
import { PageViewWrapper } from './PageViewerStyles';

export function PageViewer(props: ViewState): JSX.Element {
    const [activePage, setActivePage] = useState(0);

    const handleChange = (index: number) => {
        setActivePage(index);
    };

    if (Object.values(props.pages).length === 0) return <NoPages />;
    return (
        <Tabs activeTab={activePage} onChange={handleChange}>
            <PageViewerHeader {...props} pages={props} />
            <PageViewWrapper>
                <PageViewerPages pages={props} activePage={activePage} />
            </PageViewWrapper>
        </Tabs>
    );
}
