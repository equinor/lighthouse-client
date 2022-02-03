import { SingleSelect } from '@equinor/eds-core-react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    gap: 1em;
`;
type GroupingSelectorsProps<T> = {
    enableGroupBy: boolean | undefined;
    options: string[];
    groupByKey: keyof T;
    seriesKey: keyof T;
    handleChange: (selector: 'groupBy' | 'series', selectedItem: keyof T) => void;
};

export const GroupingSelectors = <T extends unknown>(props: GroupingSelectorsProps<T>) => {
    const { enableGroupBy, options, seriesKey, groupByKey, handleChange } = props;
    if (!enableGroupBy) return null;
    return (
        <Container>
            <SingleSelect
                items={options}
                label="Group by"
                value={`${groupByKey}`}
                handleSelectedItemChange={(select) => {
                    if (select.selectedItem)
                        handleChange('groupBy', select.selectedItem as keyof T);
                }}
                style={{ height: '30px' }}
            />

            <SingleSelect
                items={options}
                label="Series"
                value={`${seriesKey}`}
                handleSelectedItemChange={(select) => {
                    if (select.selectedItem) handleChange('series', select.selectedItem as keyof T);
                }}
                style={{ height: '30px' }}
            />
        </Container>
    );
};
