import { tokens } from '@equinor/eds-tokens';
import { Embed, models, Report, service, VisualDescriptor } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import 'powerbi-report-authoring';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from '../../../components/Icon/Icon';
import { usePowerBI } from './api';
import { FilterGroup, FilterItems, PageNavigation } from './Components';
import { Filter } from './models/filter';
import './style.css';
import { PowerBiFilter, PowerBiFilterItem } from './Types';
import { getActiveFilterValues, getFilters } from './Utils';

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

export const PowerBI = ({ reportUri, filterOptions, options }: PowerBiProps): JSX.Element => {
    const { config, error } = usePowerBI(reportUri, filterOptions, options);
    const [report, setReport] = useState<Report>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const [slicerFilters, setSlicerFilters] = useState<PowerBiFilter[] | null>(null);
    const [activeFilters, setActiveFilters] = useState<
        Record<string, (string | number | boolean)[]>
    >({});
    const [filterGroupVisible, setFilterGroupVisible] = useState<string[]>();

    //TODO custom loading
    const eventHandlersMap = new Map([
        [
            'loaded',
            async function () {
                console.log('Report has loaded');

                setIsLoaded(true);
            },
        ],
        [
            'rendered',
            async function () {
                console.log('Report has rendered');

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

    const handleOnChange = async (group: PowerBiFilter, filter: PowerBiFilterItem) => {
        try {
            const change = filter.value;

            // Get POWERBI filter
            let newConditions: (string | number | boolean)[] = [];
            if (activeFilters) {
                if (activeFilters[filter.type]?.includes(change)) {
                    newConditions = activeFilters[filter.type].filter((a) => a !== change);
                } else {
                    newConditions = [...activeFilters[filter.type], change];
                }
                setActiveFilters((prev) => ({ ...prev, [filter.type]: newConditions }));
            }
            // Set POWERBI filter to the new filter, not overriding previous filters
            const slicerFilter: models.IAdvancedFilter = {
                $schema: 'http://powerbi.com/product/schema#advanced',
                target: filter!.target!,
                filterType: models.FilterType.Advanced,
                logicalOperator: 'Or',
                conditions:
                    newConditions.length < 0
                        ? undefined
                        : newConditions.map((x) =>
                              x === '(Blank)'
                                  ? { operator: 'IsBlank' }
                                  : { operator: 'Is', value: x }
                          ),
            };
            await group.slicer?.setSlicerState({
                filters: newConditions.length > 0 ? [slicerFilter] : [],
            });
        } catch (errors) {
            console.error(errors);
        }
    };

    const handleChangeGroup = (filter: PowerBiFilter) => {
        if (filterGroupVisible?.find((a) => a === filter.type) !== undefined) {
            setFilterGroupVisible(filterGroupVisible.filter((a) => a !== filter.type));
        } else {
            setFilterGroupVisible((prev) => [...(prev ? prev : []), filter.type]);
        }
    };
    useEffect(() => {
        if (report && isLoaded) {
            (async () => {
                const filters = await getFilters(report);
                const activeFilters = await getActiveFilterValues(filters);
                setSlicerFilters(filters);
                setActiveFilters(activeFilters);
            })();
        }
    }, [report, isLoaded]);

    useEffect(() => {
        if (report && isLoaded) {
            (async () => {
                const filters = await getFilters(report);
                setSlicerFilters(filters);
            })();
        }
    }, [activeFilters]);
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
                    {slicerFilters && (
                        <div style={{ display: 'flex' }}>
                            <FilterGroup
                                slicerFilters={slicerFilters}
                                filterGroupVisible={filterGroupVisible}
                                handleChangeGroup={handleChangeGroup}
                            />

                            <FilterItems
                                filterGroupVisible={filterGroupVisible}
                                handleOnChange={handleOnChange}
                                slicerFilters={slicerFilters}
                                activeFilters={activeFilters}
                            />
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
