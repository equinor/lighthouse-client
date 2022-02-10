import { Checkbox } from '@equinor/eds-core-react';
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
import { FilterGroup } from './Components/Filter/FilterGroup/FilterGroup';
import { FilterItems } from './Components/Filter/FilterItems/FilterItems';
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
export interface PowerBiFilterReturn {
    filter: PowerBiFilter;
    filterValues: string[];
    type: string;
}
export interface GetFilterReturn {
    filters: PowerBiFilter[];
    filterVals: Record<string, string[]>;
}
export interface PowerBiFilter {
    type: string;
    slicer: VisualDescriptor;
    sortOrder: number;
    value: Record<string, PowerBiFilterItem>;
}

export interface PowerBiFilterItem {
    checked: boolean;
    type: string;
    value: string;
    slicerName: string;
    isVisible: boolean;
    target: models.IFilterGeneralTarget | undefined;
}

async function updateFilters(
    reportInstance: Report | undefined
): Promise<Record<string, string[]> | undefined> {
    if (!reportInstance) {
        console.log('no report');
        return;
    }
    const page = await reportInstance.getActivePage();
    const visuals = await page.getVisuals();
    const slicers = visuals.filter((visual) => visual.type == 'slicer');
    const filterVals = {};
    slicers.forEach(async (slicer) => {
        const { data } = await slicer.exportData();
        const { filters: a } = await slicer.getSlicerState();
        const { values, type } = transformData(data);
        const foo: string[][] = [];
        a.forEach((b) => {
            foo.push((b?.values as string[]).filter((blah) => values.indexOf(blah) > -1));
        });
        const asdasd = foo.flatMap((a) => a);
        if (asdasd.length !== 0) console.log('asdasdssdd', asdasd);
        filterVals[type] = asdasd;
    });

    return filterVals;
}

async function getFilters(reportInstance: Report): Promise<GetFilterReturn> {
    const page = await reportInstance.getActivePage();
    const visuals = await page.getVisuals();
    const slicers = visuals.filter((visual) => visual.type == 'slicer');
    const filterVals = {};
    const filters = await Promise.all(
        slicers.map(async (slicer) => {
            const { data } = await slicer.exportData();
            const filter = (await slicer.getFilters()).at(0);
            const {
                filter: pbiFilter,
                type,
                filterValues,
            } = createPowerBiFilter(data, slicer, filter);
            const { filters: a } = await slicer.getSlicerState();
            const foo: string[][] = [];
            a.forEach((b) => {
                foo.push((b?.values as string[]).filter((blah) => filterValues.indexOf(blah) > -1));
            });
            const asdasd = foo.flatMap((a) => a);
            filterVals[type] = asdasd;
            return pbiFilter;
        })
    );
    return { filters, filterVals };
}
export const transformData = (data: string): { type: string; values: string[] } => {
    const rawData = data.split('\r\n');

    const type = rawData.shift() || '';

    // FilterCleanup
    const values = rawData.filter((data) => data !== '');
    return {
        type,
        values,
    };
};
function createPowerBiFilter(
    data: string,
    slicer: VisualDescriptor,
    sliceFilter: models.IFilter | undefined
): PowerBiFilterReturn {
    // SortOrder
    const x = slicer.layout.x || 0;
    const y = slicer.layout.y || 0;
    const sortOrder = x + y;

    // FilterCleanup
    const { values, type } = transformData(data);

    // Initial filter Object
    const filter = { type, slicer, sortOrder, value: {} };

    // Adding filter values
    values.forEach((item) => {
        filter.value[item] = {
            checked: false,
            isVisible: true,
            type: filter.type,
            value: item,
            slicerName: slicer.name,
            target: sliceFilter?.target,
        };
    });

    return { filter, filterValues: values, type };
}

export const PowerBI = ({ reportUri, filterOptions, options }: PowerBiProps): JSX.Element => {
    const { config, error } = usePowerBI(reportUri, filterOptions, options);
    const [report, setReport] = useState<Report>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const [slicerFilters, setSlicerFilters] = useState<PowerBiFilter[] | null>(null);
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
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
                const a = await updateFilters(report);
                // Set the new POWERBI filter to our local filter state
                console.log('inside report rendered', a);
                a && setActiveFilters(a);
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

    const handleOnChangeTemp = async (group: PowerBiFilter, filter: PowerBiFilterItem) => {
        try {
            // Toggle check property for group.value[key]
            // Get POWERBI filter
            const change = filter.value;
            let temp: string[] = [];
            if (activeFilters) {
                if (activeFilters[filter.type]?.includes(change)) {
                    temp = activeFilters[filter.type].filter((a) => a !== change);
                } else {
                    temp = [...activeFilters[filter.type], change];
                }
            }
            // Set POWERBI filter to the new filter, not overriding previous filters

            console.log('activefilters', activeFilters);
            const slicerFilter: models.IAdvancedFilter = {
                $schema: 'http://powerbi.com/product/schema#advanced',
                target: filter!.target!,
                filterType: models.FilterType.Advanced,
                logicalOperator: 'Or',
                conditions:
                    temp.length < 0
                        ? undefined
                        : temp.map((x) =>
                              x === '(Blank)'
                                  ? { operator: 'IsBlank' }
                                  : { operator: 'Is', value: x }
                          ),
            };
            await group.slicer?.setSlicerState({
                filters: filter.checked ? [] : [slicerFilter],
            });
            // Get new POWERBI filter based on previous step
            // report?.on('rendered', async () => {
            //     const a = await updateFilters(report);
            //     // Set the new POWERBI filter to our local filter state
            //     console.log('inside report rendered', a);
            //     a && setActiveFilters(a);
            // });
            // const a = await updateFilters(report);
            // // Set the new POWERBI filter to our local filter state
            // console.log('inside report rendered', a);
            // a && setActiveFilters(a);
            // While preserving the old state
            //e.g. if checked = true for group.value[key] before setting the state, it should still be true after.

            //Create a new basic filter for the slicer with values from the clicked checkbox

            //If the checkbox clicked is already clicked we want to remove the filter (but not all, need fix)
            //If the checkbox is not already checked, we want to apply the new filter (but also not overwrite the old ones, need fix)
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
                const { filters, filterVals } = await getFilters(report);
                setSlicerFilters(filters);
                setActiveFilters(filterVals);
            })();
        }
    }, [report, isLoaded]);
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
                                handleOnChangeTemp={handleOnChangeTemp}
                                slicerFilters={slicerFilters}
                                activeFilters={activeFilters}
                            />
                        </div>
                    )}
                    {/* <PageNavigation report={report} /> */}
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
