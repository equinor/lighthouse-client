import { Checkbox } from '@equinor/eds-core-react';
import { PowerBiFilter } from '../../..';
type FilterGroupProps = {
    slicerFilters: PowerBiFilter[];
    filterGroupVisible: string[] | undefined;
    handleChangeGroup: (filter: PowerBiFilter) => void;
};
export const FilterGroup = ({
    slicerFilters,
    filterGroupVisible,
    handleChangeGroup,
}: FilterGroupProps) => {
    return (
        <div style={{ height: '200px', overflow: 'scroll', width: '200px' }}>
            {slicerFilters.map((filter, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Checkbox
                            onChange={() => {
                                handleChangeGroup(filter);
                            }}
                            checked={
                                filterGroupVisible?.find((a) => a === filter.type) !== undefined
                            }
                        />
                        {filter.type}
                    </div>
                );
            })}
        </div>
    );
};
