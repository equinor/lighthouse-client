import { Report } from 'powerbi-client';
import { useCallback, useEffect, useState } from 'react';
import { ActiveFilter, PowerBiFilter, PowerBiFilterItem } from '../../Types';
import { createAdvancedPbiFilter, getActiveFilterValues, getFilters } from '../../Utils';
import { PowerBIQuickFilter } from './PowerBiQuickFilter';
import { FilterController } from './types';

interface PowerBIFilterOptions {
  defaultFilterGroupVisible?: string[];
}

type PowerBIFilterProps = {
  report: Report;
  isLoaded: boolean;
  options?: PowerBIFilterOptions;
  setIsFilterExpanded: (isExpanded: boolean) => void;
  isFilterExpanded: boolean;
  isFilterActive: boolean;
};
export const PowerBIFilter = ({
  isLoaded,
  report,
  isFilterActive,
  setIsFilterExpanded,
  isFilterExpanded,
  options,
}: PowerBIFilterProps): JSX.Element | null => {
  const [activeFilters, setActiveFilters] = useState<Record<string, ActiveFilter[]>>({});
  const [slicerFilters, setSlicerFilters] = useState<PowerBiFilter[] | null>(null);
  const [filterGroupVisible, setFilterGroupVisible] = useState<string[]>(
    options?.defaultFilterGroupVisible || []
  );

  const handleChangeGroup = async (filter: PowerBiFilter) => {
    if (filterGroupVisible?.find((a) => a === filter.type) !== undefined) {
      setFilterGroupVisible(filterGroupVisible.filter((a) => a !== filter.type));
      setActiveFilters((prev) => ({ ...prev, [filter.type]: [] }));
      await filter.slicer?.setSlicerState({ filters: [] });
    } else {
      setFilterGroupVisible((prev) => [...(prev ? prev : []), filter.type]);
    }
  };

  /**
   * Function to handle "Select All" checkbox.
   * Will either add all visible filter values to current target, or remove all depending
   * on if checkbox is ticked or not.
   */
  const handleOnSelectAll = async (
    group: PowerBiFilter,
    filter: PowerBiFilterItem,
    allVisibleFilterValues: string[]
  ) => {
    try {
      const slicerFilter = createAdvancedPbiFilter(filter, allVisibleFilterValues);

      setActiveFilters((prev) => ({
        ...prev,
        [filter.type]: allVisibleFilterValues,
      }));
      await group.slicer?.setSlicerState({ filters: slicerFilter });
    } catch (errors) {
      console.error("Couldn't select all filters", errors);
    }
  };

  /** Main function for handling user events on checkboxes for filters.
   * Will set new filters on slicer, or remove depending on if it already exists or not.
   */
  const handleOnChange = async (
    group: PowerBiFilter,
    filter: PowerBiFilterItem,
    singleClick = false
  ) => {
    try {
      const change = filter.value;

      let newConditions: ActiveFilter[] = [];

      if (activeFilters) {
        /** Either clicking on a label, only selecting this single one, deselect all others if any,
         *  or clicking on a checkbox, selecting multiple ones, or deselecting.
         */
        if (singleClick) {
          if (activeFilters[filter.type]?.includes(change)) {
            newConditions = activeFilters[filter.type].filter((a) => a === change);
          } else {
            newConditions = [change];
          }
          setActiveFilters((prev) => ({ ...prev, [filter.type]: newConditions }));
        } else {
          if (activeFilters[filter.type]?.includes(change)) {
            newConditions = activeFilters[filter.type].filter((a) => a !== change);
          } else {
            newConditions = [...activeFilters[filter.type], change];
          }
          setActiveFilters((prev) => ({ ...prev, [filter.type]: newConditions }));
        }
      }
      const filters =
        newConditions.length === 0 ? [] : createAdvancedPbiFilter(filter, newConditions);

      await group.slicer?.setSlicerState({
        filters,
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

        const emptyActiveFilters: Record<string, ActiveFilter[]> = {};
        for (const key in activeFilters) {
          emptyActiveFilters[key] = [];
        }

        setActiveFilters(emptyActiveFilters);
      }
    } catch (errors) {
      console.error('Couldnt remove filters', errors);
    }
  };

  const deselectAllValues = useCallback(async (group: PowerBiFilter, filter: PowerBiFilterItem) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filter.type]: [],
    }));
    await group.slicer.setSlicerState({ filters: [] });
  }, []);

  /**
   * Effect should be triggered when report has first loaded,
   * initializing all possible filters and also checking for default active filters.
   * Also need to handle when user changes page, so this effect has to also be triggered when
   * page is changed.
   */
  useEffect(() => {
    if (report && isLoaded) {
      const initFilters = async () => {
        const filters = await getFilters(report);
        const defaultActiveFilters = await getActiveFilterValues(filters);
        setSlicerFilters(filters.sort((a, b) => a.type.localeCompare(b.type)));
        setActiveFilters(defaultActiveFilters);
      };

      initFilters();
    }
  }, [report, isLoaded]);

  /**
   * Effect should be triggered when activeFilters has changed.
   * Some filters may not longer be applicable, therefore the need to get filters again.
   * Dependency array needs to check for length because checking only object will not fire the effect.
   */
  useEffect(() => {
    if (report && isLoaded) {
      const reCreateFilters = async () => {
        const filters = await getFilters(report);

        setSlicerFilters(filters.sort((a, b) => a.type.localeCompare(b.type)));

        const filterGroupNames = filters.map((s) => s.type);
        setFilterGroupVisible((s) =>
          [...s, ...filterGroupNames].filter((v, i, a) => a.indexOf(v) === i)
        );
      };
      reCreateFilters();
    }
  }, [activeFilters, Object.keys(activeFilters).length]);

  if (!slicerFilters || Object.keys(activeFilters).length === 0) return null;

  const controller: FilterController = {
    handleChangeGroup,
    handleOnChange,
    handleOnSelectAll,
    deselectAllValues,
    setIsFilterExpanded,
    isFilterExpanded,
    resetFilter,
    isAnyFiltersActive: () => Object.values(activeFilters).some((group) => group.length > 0),
    slicerFilters,
    activeFilters,
    visibleFilters: filterGroupVisible,
    setVisibleFilters: setFilterGroupVisible,
  };
  if (!isFilterActive) return null;
  return <PowerBIQuickFilter controller={controller} />;
};
