import React from 'react';
import styled from 'styled-components';

interface HeatTracingCableProps {
    value: string;
}
export const HeatTracingCable = ({ value }: HeatTracingCableProps): JSX.Element => {
    return <HeatTracingTableNode>{value}</HeatTracingTableNode>;
};

const HeatTracingTableNode = styled.div`
    border-bottom: dashed;
    padding: 5px;
    text-align: center;
    margin-bottom: 5px;
`;
