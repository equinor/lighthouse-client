import React from 'react';
import styled from 'styled-components';

interface CableProps {
    value: string;
}
export const Cable = ({ value }: CableProps): JSX.Element => {
    return <CableNode>{value}</CableNode>;
};

const CableNode = styled.div`
    flex: 0 0 120px;
    max-height: 15px;
    border-bottom: solid;
    padding: 5px;
    text-align: center;
`;
