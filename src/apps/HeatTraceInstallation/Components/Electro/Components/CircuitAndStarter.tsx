import React from 'react';
import styled from 'styled-components';

interface CircuitAndStarterProps {
    value: string;
}
export const CircuitAndStarter = ({ value }: CircuitAndStarterProps): JSX.Element => {
    return <CircuitAndStarterNode>{value}</CircuitAndStarterNode>;
};

const CircuitAndStarterNode = styled.div`
    flex: 0 0 100px;
    height: 20px;
    border-style: solid;
    border-width: thin;
    border-radius: 10px;
    padding: 7px;
    text-align: center;
    margin-top: 10px;
`;
