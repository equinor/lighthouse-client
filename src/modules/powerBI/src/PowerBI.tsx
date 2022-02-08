import { tokens } from '@equinor/eds-tokens';
import { Embed, models, Report, service, VisualDescriptor } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import 'powerbi-report-authoring';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from '../../../components/Icon/Icon';
import { usePowerBI } from './api';
import { PageNavigation } from './Components';
import { Filter } from './models/filter';
import './style.css';

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

interface PowerBiFilter {
    type: string;
    slicer: VisualDescriptor;
    sortOrder: number;
    value: Record<string, PowerBiFilterItem>;
}

interface PowerBiFilterItem {
    checked: boolean;
    type: string;
    value: string;
    slicerName: string;
    isVisible: boolean;
}

async function updateFilters(reportInstance: Report, filters: PowerBiFilter[]) {
    const currentFilters = await getFilters(reportInstance);
    currentFilters.forEach((filter, index) => {
        filters[index] = filter;
    });
}

async function getFilters(reportInstance: Report): Promise<PowerBiFilter[]> {
    const page = await reportInstance.getActivePage();
    const visuals = await page.getVisuals();
    const slicers = visuals.filter((visual) => visual.type == 'slicer');
    const filters = await Promise.all(
        slicers.map(async (slicer) => {
            const { data } = await slicer.exportData();
            return createPowerBiFilter(data, slicer);
        })
    );
    return filters;
}

function createPowerBiFilter(data: string, slicer: VisualDescriptor): PowerBiFilter {
    const rawData = data.split('\r\n');

    // SortOrder
    const x = slicer.layout.x || 0;
    const y = slicer.layout.y || 0;
    const sortOrder = x + y;
    const type = rawData.shift() || '';

    // FilterCleanup
    const cleanFilterItems = rawData.filter((data) => data !== '');

    // Initial filter Object
    const filter = { type, slicer, sortOrder, value: {} };

    // Adding filter values
    cleanFilterItems.forEach((item) => {
        filter.value[item] = {
            checked: true,
            isVisible: true,
            type: filter.type,
            value: item,
            slicerName: slicer.name,
        };
    });

    return filter;
}

export const PowerBI = ({ reportUri, filterOptions, options }: PowerBiProps): JSX.Element => {
    const { config, error } = usePowerBI(reportUri, filterOptions, options);
    const [report, setReport] = useState<Report>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [filters, setFilters] = useState<PowerBiFilter[] | null>(null);
    const [visual, setVisual] = useState<VisualDescriptor | undefined>(undefined);

    //TODO custom loading
    const eventHandlersMap = new Map([
        [
            'loaded',
            async function () {
                console.log('Report has loaded');
                setIsLoaded(false);

                setIsLoaded(true);
            },
        ],
        [
            'rendered',
            function () {
                console.log('Report has rendered');
                setIsLoaded(false);

                setIsLoaded(true);
                // Update display message
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
        [
            'dataSelected',
            function (e) {
                if (e) {
                    console.log(e.detail);
                    if (e.detail.dataPoints && e.detail.dataPoints.length > 0) {
                        e.detail.dataPoints.forEach((p) => {
                            p.identity.forEach((element) => {
                                console.log(element.target.column, element.equals);
                            });
                        });
                    }
                }
                debugger;
            },
        ],
        [
            'selectionChanged',
            function (e) {
                if (e) {
                    console.log('"electionChanged" ', e);
                }
            },
        ],
    ]);

    useEffect(() => {
        if (isLoaded && report) {
            (async () => {
                const filters = await getFilters(report);
                setFilters(filters);
            })();
        }
    }, [isLoaded, report]);
    useEffect(() => {
        console.log(filters);
    }, [filters]);
    const handleClick = async (filter: PowerBiFilter, val) => {
        // const page = await report?.getActivePage();
        // const visuals = await page?.getVisuals();
        try {
            const visuals = await report
                ?.getActivePage()
                .then(async (activePage) => await activePage.getVisuals());

            const visual = visuals?.find((visual) => visual.name === filter.slicer.name);
            setVisual(visual);
        } catch (e) {
            console.error('Couldnt get visual', e);
        }
        try {
            const test = await visual?.getSlicerState();
            test &&
                test.targets &&
                (await visual?.setSlicerState({
                    filters: [
                        {
                            $schema: 'http://powerbi.com/product/schema#basic',
                            target: [
                                {
                                    table: 'Fact_Checklist',
                                    column: 'Project (ProCoSys)',
                                },
                            ],
                            filterType: 1,
                            operator: 'In',
                            values: ['L.O532C.002 (Johan Castberg Facilities Project)'],
                            requireSingleSelection: false,
                        },
                    ],
                    targets: [
                        {
                            table: 'Fact_Checklist',
                            column: 'Project (ProCoSys)',
                        },
                    ],
                }));
        } catch (e) {
            console.error('Something went wrong', e);
        }
        // if (visual) {
        //     const blah = await filter.slicer.getSlicerState();
        //     console.log('slicer state', blah);
        //     const foo = await visual.getFilters();
        //     console.log('filter state for visual', foo);
        //     const target = blah.targets;

        //     await filter.slicer.setSlicerState({
        //         filters: [
        //             {
        //                 $schema: 'http://powerbi.com/product/schema#basic',
        //                 target: {
        //                     table: 'Fact_Checklist',
        //                     column: 'FORMULARGROUP',
        //                 },
        //                 filterType: 1,
        //                 operator: 'In',
        //                 values: ['CPCL'],
        //                 requireSingleSelection: false,
        //             },
        //         ],
        //     });
        // }
    };

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
                    {filters && (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {filters.map((filter) => {
                                const vals = Object.values(filter.value);

                                return (
                                    <pre
                                        key={filter.type}
                                        style={{
                                            height: '100px',
                                            overflow: 'scroll',
                                            width: '200px',
                                        }}
                                    >
                                        {filter.type}
                                        {vals.map((val) => {
                                            return (
                                                <div
                                                    key={val.value}
                                                    onClick={async () => {
                                                        const basicFilter: models.IBasicFilter = {
                                                            $schema:
                                                                'http://powerbi.com/product/schema#basic',
                                                            target: [
                                                                {
                                                                    table: 'Commpkg',
                                                                    column: 'PRIORITY1',
                                                                },
                                                            ],
                                                            operator: 'In',
                                                            values: ['ECOM'],
                                                            filterType: models.FilterType.Basic,
                                                        };
                                                        await filter.slicer.setSlicerState({
                                                            filters: [basicFilter],
                                                        });
                                                        // await report
                                                        //     ?.getActivePage()
                                                        //     .then((activePage) => {
                                                        //         activePage
                                                        //             .getVisuals()
                                                        //             .then((visuals) => {
                                                        //                 visuals
                                                        //                     .find(
                                                        //                         (visual) =>
                                                        //                             visual.name ===
                                                        //                             filter.slicer
                                                        //                                 .name
                                                        //                     )
                                                        //                     ?.setSlicerState({
                                                        //                         filters: [
                                                        //                             basicFilter,
                                                        //                         ],
                                                        //                         targets: [
                                                        //                             {
                                                        //                                 table: 'Commpkg',
                                                        //                                 column: 'PRIORITY1',
                                                        //                             },
                                                        //                         ],
                                                        //                     });
                                                        //             });
                                                        //     });
                                                    }}
                                                >
                                                    {val.value}
                                                </div>
                                            );
                                        })}
                                    </pre>
                                );
                            })}
                        </div>
                    )}
                    <PageNavigation report={report} />
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
