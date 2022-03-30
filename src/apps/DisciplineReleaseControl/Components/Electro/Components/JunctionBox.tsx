import React from 'react';
import styled from 'styled-components';

interface JunctionBoxProps {
    value: string;
}
export const JunctionBox = ({ value }: JunctionBoxProps): JSX.Element => {
    return <JunctionBoxNode>{value}</JunctionBoxNode>;
};

const JunctionBoxNode = styled.div`
    flex: 0 0 100px;
    border-style: solid;
    border-width: thin;
    border-radius: 10px;
    padding: 7px;
    text-align: center;
`;
