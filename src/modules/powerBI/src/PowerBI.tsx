import { tokens } from '@equinor/eds-tokens';
import { Embed, Report, service, VisualDescriptor } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import 'powerbi-report-authoring';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from '../../../components/Icon/Icon';
import { usePowerBI } from './api';
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

export const PowerBI = ({ reportUri, filterOptions }: PowerBiProps): JSX.Element => {
    const { config, error } = usePowerBI(reportUri, filterOptions);
    const [report, setReport] = useState<Report>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
                    console.log(event.detail);
                    if (e.detail.dataPoints && e.detail.dataPoints.length > 0) {
                        e.detail.dataPoints.forEach((p) => {
                            p.identity.forEach((element) => {
                                console.log(element.target.column, element.equals);
                            });
                        });
                    }
                }
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
            getFilters(report);
        }
    }, [isLoaded, report]);

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
