import { ActiveFilter, PowerBiFilter, PowerBiFilterItem } from '../../Types';

export type FilterController = {
  deselectAllValues: (group: PowerBiFilter, filter: PowerBiFilterItem) => Promise<void>;
  handleChangeGroup: (filter: PowerBiFilter) => Promise<void>;
  handleOnSelectAll: (
    group: PowerBiFilter,
    filter: PowerBiFilterItem,
    allVisibleFilterValues: string[]
  ) => Promise<void>;
  handleOnChange: (
    group: PowerBiFilter,
    filter: PowerBiFilterItem,
    singleClick?: boolean
  ) => Promise<void>;
  resetFilter: () => Promise<void>;
  isAnyFiltersActive: () => boolean;
  slicerFilters: PowerBiFilter[];
  activeFilters: Record<string, ActiveFilter[]>;
  setIsFilterExpanded: (isExpanded: boolean) => void;
  isFilterExpanded: boolean;
  visibleFilters: string[];
  setVisibleFilters: (visibleGroups: string[]) => void;
};
