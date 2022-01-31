import { tokens } from '@equinor/eds-tokens';
import { Embed, Page, Report, service } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import 'powerbi-report-authoring';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from '../../../components/Icon/Icon';

import { usePowerBI } from './api';
import { Filter } from './models/filter';
import './style.css';
import { Chip } from '@equinor/eds-core-react';
const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: calc(100vh - 110px);
`;

const ErrorWrapper = styled.div`
    margin-top: 100px;
    height: '-webkit-fill-available';
    height: 50%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
`;

const Heading = styled.h1`
    color: ${tokens.colors.text.static_icons__tertiary.rgba};
    margin-bottom: 0;
`;

interface PowerBiProps {
    reportUri: string;
    filterOptions?: Filter[];
    options?: {
        showFilter?: boolean;
        enableNavigation?: boolean;
    };
}
/**
 * Gets all pages for powerbi report
 * Will only change pages if pages is undefined because
 * report.setPage() will cause this to set the state every time
 * user changes a page.
 */
const useGetPages = (report?: Report) => {
    const [pages, setPages] = useState<Page[]>();

    useEffect(() => {
        const getPages = () => {
            report &&
                !pages &&
                report.on('rendered', async () => {
                    try {
                        const pbiPages = await report.getPages();
                        setPages(pbiPages);
                    } catch {}
                });
        };
        getPages();
    }, [report]);

    return { pages };
};

/**
 * Will get the active page at first render.
 * If user changes page, it should be handled outside of the hook (setActivePage)
 * @param report
 * @returns
 */
const useActivePage = (
    report?: Report
): [activePage: Page | undefined, setActivePage: (page: Page) => void] => {
    const [activePage, setActivePage] = useState<Page>();

    const handleChange = useCallback(
        (page: Page) => {
            report?.setPage(page.name);
            setActivePage(page);
        },
        [report]
    );

    useEffect(() => {
        report &&
            !activePage &&
            report.on('rendered', async () => {
                try {
                    const active = await report.getActivePage();

                    setActivePage(active);
                } catch {}
            });
    }, [activePage, report]);

    return [activePage, handleChange];
};
export const PowerBI = ({ reportUri, filterOptions, options }: PowerBiProps): JSX.Element => {
    const { config, error } = usePowerBI(reportUri, filterOptions, options);
    const [report, setReport] = useState<Report>();
    const { pages } = useGetPages(report);
    const [activePage, setActivePage] = useActivePage(report);
    //TODO custom loading
    const eventHandlersMap = new Map([
        [
            'loaded',
            function () {
                console.log('Report has loaded');
            },
        ],
        [
            'rendered',
            function () {
                console.log('Report has rendered');

                // Update display message
                //setMessage('The report is rendered');
            },
        ],
        [
            'error',
            function (event?: service.ICustomEvent<any>) {
                if (event) {
                    console.error(event.detail);
                }
            },
        ],
    ]);
    const handleClick = useCallback(
        (page: Page) => {
            if (report) {
                setActivePage(page);
            }
        },
        [report]
    );
    return (
        <>
            {error ? (
                <ErrorWrapper>
                    <Icon
                        name={'warning_outlined'}
                        color={tokens.colors.interactive.warning__resting.rgba}
                        size={48}
                    />
                    <Heading>{error.message}</Heading>
                </ErrorWrapper>
            ) : (
                <Wrapper>
                    <div style={{ display: 'flex' }}>
                        {pages &&
                            pages.map((page) => {
                                return (
                                    <Chip
                                        key={page.name}
                                        onClick={() => handleClick(page)}
                                        variant={
                                            page.name === activePage?.name ? 'active' : 'default'
                                        }
                                    >
                                        {page.displayName}
                                    </Chip>
                                );
                            })}
                    </div>
                    <PowerBIEmbed
                        embedConfig={config}
                        eventHandlers={eventHandlersMap}
                        getEmbeddedComponent={(embedObject: Embed) => {
                            console.log(
                                `Embedded object of type "${embedObject.embedtype}" received`
                            );
                            setReport(embedObject as Report);

                            window['report'] = embedObject;
                        }}
                        cssClassName="pbiEmbed"
                    />
                </Wrapper>
            )}
        </>
    );
};
