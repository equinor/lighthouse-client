import { FilterValueType, useFilterApiContext } from '@equinor/filter';
import { useRef } from 'react';
import { useWorkSpace } from '../../../WorkSpaceApi/useWorkSpace';
import { FilterGroupPopoverMenu } from './FilterGroupPopoverMenu';
import { FilterGroupWrapper, NormalText } from './groupStyles';

interface FilterGroupProps {
    name: string;
    isOpen: boolean;
    onClick: () => void;
}
export const FilterGroup = ({ name, isOpen, onClick }: FilterGroupProps): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    const { filterOptions = [] } = useWorkSpace();

    const {
        filterGroupState: { getGroupValues, checkValueIsInActive, getInactiveGroupValues },
        filterState: { getFilterState },
        operations: { changeFilterItem, markAllValuesActive, setFilterState },
    } = useFilterApiContext();

    const handleFilterItemLabelClick = (val: FilterValueType) =>
        setFilterState([
            ...getFilterState().filter((s) => s.name !== name),
            { name: name, values: getGroupValues(name).filter((s) => s !== val) },
        ]);

    const values = getGroupValues(name);

    const isChecked = (filterValue: FilterValueType) => checkValueIsInActive(name, filterValue);

    const handleFilterItemClick = (filterItem: FilterValueType) =>
        changeFilterItem(isChecked(filterItem) ? 'MarkActive' : 'MarkInactive', name, filterItem);

    const isAllChecked = getInactiveGroupValues(name).length === 0;

    const checkedValues = values.filter((value) => !getInactiveGroupValues(name).includes(value));

    const customRender =
        filterOptions.find((s) => s.name === name)?.customValueRender ??
        ((v) => <>{v?.toString() ?? '(Blank)'}</>);

    if (values.length === 0) return <></>;
    return (
        <div>
            <FilterGroupWrapper ref={ref} onClick={onClick}>
                {getFilterHeaderText(isAllChecked, name, checkedValues)}
            </FilterGroupWrapper>
            {isOpen && (
                <FilterGroupPopoverMenu
                    handleFilterItemLabelClick={handleFilterItemLabelClick}
                    handleFilterItemClick={handleFilterItemClick}
                    isChecked={isChecked}
                    markAllValuesActive={() => markAllValuesActive(name)}
                    onClick={onClick}
                    anchorEl={ref.current}
                    values={values}
                    CustomRender={customRender}
                />
            )}
        </div>
    );
};

function getFilterHeaderText(
    isAllChecked: boolean,
    name: string,
    checkedValues: FilterValueType[]
): string | JSX.Element {
    if (isAllChecked || checkedValues.length === 0) return <NormalText>{name}</NormalText>;

    return checkedValues.length - 1 > 0
        ? `${checkedValues[0] ?? '(Blank)'}(+${checkedValues.length - 1})`
        : `${checkedValues[0]}`;
}
