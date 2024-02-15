import { Icon, Progress } from '@equinor/eds-core-react-old';
import { tokens } from '@equinor/eds-tokens';
import { Column, defaultGroupByFn, Table } from '@equinor/Table';
import styled from 'styled-components';
export const NoResourceData = styled.div`
    text-align: center;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
`;

export const InfoText = styled.h3`
    margin: 0;
`;

type TabTableProps<T extends Record<string | number, unknown>> = {
    packages: T[] | undefined;
    columns: Column<T>[];
    isFetching: boolean;
    error: Error | null;
    resourceName: string;
    height?: number;
};
/**
 * Component for displaying data in tabular format inside the Garden's package sidesheet.
 */
export const TabTable = <T extends Record<string | number, unknown>>(
    props: TabTableProps<T>
): JSX.Element => {
    const { packages, columns, error, isFetching, resourceName, height } = props;
    if (isFetching)
        return (
            <NoResourceData>
                <Progress.Circular />
                <InfoText>{`Fetching ${resourceName}`}</InfoText>
            </NoResourceData>
        );
    if (error || packages === undefined || packages.length === 0) {
        return (
            <NoResourceData>
                <Icon
                    name="info_circle"
                    size={40}
                    color={tokens.colors.interactive.primary__resting.hsla}
                />
                <InfoText>{`No ${resourceName}`}</InfoText>
            </NoResourceData>
        );
    }
    return (
        <Table
            columns={columns}
            data={packages}
            options={{ groupByFn: defaultGroupByFn }}
            height={height}
        />
    );
};
