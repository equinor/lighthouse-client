import { Checkbox } from '@equinor/eds-core-react-old';
import { memo, useMemo } from 'react';
import { ActiveFilter, PowerBiFilter, PowerBiFilterItem } from '../../../../Types';
import { IS_BLANK } from '../../../../Utils';
import { CheckboxItem } from './Styles';

type ItemProps = {
  activeFilters: ActiveFilter[];
  filter: PowerBiFilterItem;
  group: PowerBiFilter;
  handleOnChange: (
    group: PowerBiFilter,
    filter: PowerBiFilterItem,
    singleClick?: boolean
  ) => Promise<void>;
  virtualItemStart: number;
  virtualItemSize: number;
};

const convertNullToBlank = (activeFilters: ActiveFilter[]) =>
  activeFilters.map((activeFilter) => (activeFilter === null ? IS_BLANK : activeFilter));

const FilterItem = ({
  activeFilters,
  filter,
  group,
  handleOnChange,
  virtualItemSize,
  virtualItemStart,
}: ItemProps) => {
  const isActive = useMemo(() => {
    return convertNullToBlank(activeFilters).includes(filter.value) ? true : false;
  }, [activeFilters, filter.value]);
  return (
    <CheckboxItem
      title={filter.value}
      style={{
        transform: `translateY(${virtualItemStart}px)`,
        height: `${virtualItemSize}px`,
      }}
    >
      <Checkbox
        crossOrigin={undefined}
        onChange={async () => {
          await handleOnChange(group, filter);
        }}
        checked={isActive}
      />
      <label
        onClick={async () => {
          await handleOnChange(group, filter, true);
        }}
      >
        {filter.value}
      </label>
    </CheckboxItem>
  );
};
export const Item = memo(FilterItem);
