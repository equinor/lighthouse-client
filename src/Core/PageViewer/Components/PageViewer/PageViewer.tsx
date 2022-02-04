import { Tabs } from '@equinor/eds-core-react';
import { PopoutSidesheet } from '@equinor/sidesheet';
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

    const [isFilterActive, setIsFilterActive] = useState(false);

    function handleFilter() {
        setIsFilterActive((s) => !s);
    }

    if (Object.values(props.pages).length === 0) return <NoPages />;
    return (
        <Tabs activeTab={activePage} onChange={handleChange}>
            <PageViewerHeader
                {...props}
                viewState={props}
                activePage={activePage}
                activeFilter={isFilterActive}
                handleFilter={handleFilter}
            />
            <PageViewWrapper>
                <PageViewerPages
                    viewState={props}
                    activePage={activePage}
                    isFilterActive={isFilterActive}
                />
            </PageViewWrapper>
            <PopoutSidesheet />
        </Tabs>
    );
}
