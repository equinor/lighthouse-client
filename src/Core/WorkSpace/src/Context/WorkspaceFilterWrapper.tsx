import { FilterApiContext, FilterGroup, FilterOptions, useFilterApi } from '@equinor/filter';
import { useEffect } from 'react';
import { useDataContext } from './DataProvider';

type WorkspaceFilterWrapperProps = {
  children: React.ReactNode;
  filterOptions: FilterOptions<Record<PropertyKey, unknown>>;
};

/** Wrapper for workspace filter api */
export function WorkspaceFilterWrapper({
  children,
  filterOptions,
}: WorkspaceFilterWrapperProps): JSX.Element {
  const { data } = useDataContext();
  const filterApi = useFilterApi({ data: data, filterConfiguration: filterOptions || [] });

  const shouldInitFilter = data && data.length > 0;
  //HACK: architectural flaw
  useEffect(() => {
    filterApi.operations.init();
    const filterState = parseSearchParams(filterOptions.map((s) => s.name));
    if (filterState.length > 0) {
      const allFilterGroups = filterApi.filterState.getAllFilterGroups();
      filterApi.operations.setFilterState(generateFilterState(filterState, allFilterGroups));
      filterApi.operations.filterAndRerender();
    }
  }, [shouldInitFilter]);

  useEffect(() => {
    filterApi.operations.filterAndRerender();
  }, [data]);

  return <FilterApiContext.Provider value={filterApi}>{children}</FilterApiContext.Provider>;
}

const parseSearchParams = (validGroups: string[]) => {
  const searchParams = new URL(window.location.toString()).searchParams;
  const filters = searchParams
    .getAll('filter')
    .map((filter) => ({ name: filter.split(':')[0], values: filter.split(':')[1].split(',') }))
    .filter((filterGroup) => validGroups.includes(filterGroup.name));
  return filters;
};

function generateFilterState(filterState: FilterGroup[], allFilterGroups: FilterGroup[]) {
  return filterState.map((state) => {
    const group = allFilterGroups.find((group) => group.name === state.name);
    if (!group) {
      throw new Error('should never happen');
    }

    return {
      name: state.name,
      values: group.values.filter((value) => !state.values.includes(value)),
    };
  });
}
