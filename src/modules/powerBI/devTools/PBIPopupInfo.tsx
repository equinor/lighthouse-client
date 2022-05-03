import { Page, Report } from 'powerbi-client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

type WrapProps = {
    backgroundColor: string;
};
const Wrap = styled.div<WrapProps>`
    position: absolute;
    right: 49%;
    top: 0;
    background: ${(props) => props.backgroundColor};
    color: black;
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: fit-content;
    z-index: 2;
`;
/**
 * Only for dev purposes to be able to see the active pages and reports
 */
export const DevPbi = ({ pageId, pageDisplayName, activeReportPage, bookmarkError }) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const isReportAndPageNavDifferentPage = pageDisplayName !== activeReportPage?.displayName;
    return (
        <Wrap backgroundColor={isReportAndPageNavDifferentPage ? 'salmon' : 'lightgray'}>
            <div onClick={() => setIsOpen(!isOpen)}>X</div>
            {isOpen && (
                <>
                    <div>PageId: {pageId}</div>
                    <div>Page Display name: {pageDisplayName}</div>
                    <div>Report PageId: {activeReportPage && activeReportPage.name}</div>
                    <div>
                        Report page display name: {activeReportPage && activeReportPage.displayName}
                    </div>
                    <div>
                        BM error : {bookmarkError && JSON.stringify(bookmarkError as unknown)}
                    </div>
                </>
            )}
        </Wrap>
    );
};

const useGetActivePage = (report: Report | undefined) => {
    const [activePage, setActivePage] = useState<Page>();
    useEffect(() => {
        if (report) {
            (() => {
                report.on('rendered', async () => {
                    const a = await report.getActivePage();
                    setActivePage(a);
                });
            })();
        }
    }, [report]);

    return activePage;
};
