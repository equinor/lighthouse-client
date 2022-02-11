import { tokens } from '@equinor/eds-tokens';
import { Embed, models, Report, service } from 'powerbi-client';
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
const FilterWrapper = styled.div`
    display: flex;
    background: ${tokens.colors.ui.background__light.rgba};
    border-bottom: 1.5px solid ${tokens.colors.ui.background__medium.rgba};
    height: 200px;
`;

const FilterGroupWrap = styled.div`
    border-right: 2px solid ${tokens.colors.ui.background__medium.rgba};
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
    const [activePageName, setActivePageName] = useState<string>('');

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
            'pageChanged',
            function (event) {
                setActivePageName(event.detail.newPage.name);
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

    /**
     * Function to handle "Select All" checkbox.
     * Will either add all possible filter values to current target, or remove all depending
     * on if checkbox is ticked or not.
     */
    const handleOnSelectAll = async (group: PowerBiFilter, filter: PowerBiFilterItem) => {
        try {
            const allFilterValues = group.filterVals;

            if (
                activeFilters[filter.type]?.length === allFilterValues?.length &&
                activeFilters[filter.type]?.every(
                    (value, index) => value === allFilterValues[index]
                )
            ) {
                // All filters are applied already, remove all
                setActiveFilters((prev) => ({ ...prev, [filter.type]: [] }));
                await group.slicer.setSlicerState({ filters: [] });
            } else {
                //Apply all possible filters
                const slicerFilter: models.IBasicFilter = {
                    $schema: 'http://powerbi.com/product/schema#basic',
                    target: filter.target!,
                    filterType: models.FilterType.Basic,
                    operator: 'In',
                    values: group.filterVals,
                };
                setActiveFilters((prev) => ({ ...prev, [filter.type]: group.filterVals }));
                await group.slicer?.setSlicerState({ filters: [slicerFilter] });
            }
        } catch (errors) {
            console.error("Couldn't select all filters", errors);
        }
    };

    /** Main function for handling user events on checkboxes for filters.
     * Will set new filters on slicer, or remove depending on if it already exists or not.
     */
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

    /**
     * Function for resetting all active filters.
     * Need to go through every slicer and set its filter state to empty.
     * Could not remove all filters on e.g. active page, so will need to loop through here.
     */
    const resetFilter = async () => {
        try {
            if (activeFilters && slicerFilters) {
                for (const filter of slicerFilters) {
                    await filter.slicer.setSlicerState({ filters: [] });
                }
                setActiveFilters({});
            }
        } catch (errors) {
            console.error('Couldnt remove filters', errors);
        }
    };

    const handleChangeGroup = (filter: PowerBiFilter) => {
        if (filterGroupVisible?.find((a) => a === filter.type) !== undefined) {
            setFilterGroupVisible(filterGroupVisible.filter((a) => a !== filter.type));
        } else {
            setFilterGroupVisible((prev) => [...(prev ? prev : []), filter.type]);
        }
    };

    /**
     * Effect should be triggered when report has first loaded,
     * initializing all possible filters and also checking for default active filters.
     * Also need to handle when user changes page, so this effect has to also be triggered when
     * page is changed.
     */
    useEffect(() => {
        if (report && isLoaded) {
            (async () => {
                const filters = await getFilters(report);
                const defaultActiveFilters = await getActiveFilterValues(filters);
                setSlicerFilters(filters);
                setActiveFilters(defaultActiveFilters);
            })();
        }
    }, [report, isLoaded, activePageName]);

    /**
     * Effect should be triggered when activeFilters has changed.
     * Some filters may not longer be applicable, therefore the need to get filters again.
     */
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
                        <FilterWrapper>
                            <FilterGroupWrap>
                                <FilterGroup
                                    slicerFilters={slicerFilters}
                                    filterGroupVisible={filterGroupVisible}
                                    handleChangeGroup={handleChangeGroup}
                                    resetFilter={resetFilter}
                                />
                            </FilterGroupWrap>
                            {slicerFilters.map((group) => (
                                <FilterItems
                                    filterGroupVisible={filterGroupVisible}
                                    handleOnChange={handleOnChange}
                                    handleOnSelectAll={handleOnSelectAll}
                                    activeFilters={activeFilters}
                                    group={group}
                                    key={group.type}
                                />
                            ))}
                        </FilterWrapper>
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
