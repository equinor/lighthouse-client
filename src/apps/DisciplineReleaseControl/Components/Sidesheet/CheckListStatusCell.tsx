import { CellProps } from '@equinor/Table';
import styled from 'styled-components';
import { StatusCircle } from '../../../../packages/GardenUtils/src';
import { CheckListType } from '../../Types/pipetest';
import { getElectroViewCompletionStatusColor } from '../Electro/electroViewHelpers';

export const CheckListStatusCell = ({
    value,
}: CellProps<CheckListType, CheckListType>): JSX.Element => {
    return (
        <StatusItem>
            <StatusText>{value.status}</StatusText>
            {value.status && (
                <StatusCircle statusColor={getElectroViewCompletionStatusColor(value.status)} />
            )}
        </StatusItem>
    );
};

export const StatusItem = styled.div`
    display: flex;
    flex-direction: horizontal;
`;

export const StatusText = styled.div`
    width: 20px;
`;
