import { useState } from 'react';
import { DashboardInstance } from '../../Types/State';
import { Header } from '../Header/Header';
import { NoPages } from '../NoDashboard/NoDashboard';
import { Pages } from '../Pages/Pages';
import { PageWrapper, Wrapper } from './DashboardStyles';

export function Dashboard<T>(props: DashboardInstance<T>): JSX.Element {
    const [activePage, setActivePage] = useState(Object.values(props.pages)[0]?.pageId || '');

    const handlePageChange = (pageId: string) => {
        setActivePage(pageId);
    };

    if (Object.values(props.pages).length === 0) return <NoPages />;
    return (
        <Wrapper>
            <Header {...props} setActivePage={handlePageChange} />
            <PageWrapper>
                <Pages {...props} activePage={activePage} />
            </PageWrapper>
        </Wrapper>
    );
}
