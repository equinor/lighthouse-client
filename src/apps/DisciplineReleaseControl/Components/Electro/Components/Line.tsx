import React from 'react';
import styled from 'styled-components';

interface LineProps {
    value: string;
}
export const Line = ({ value }: LineProps): JSX.Element => {
    return <LineNode>{value}</LineNode>;
};

const LineNode = styled.div`
    flex: 0 0 86px;
    height: 20px;
    border-style: solid;
    border-width: thin;
    border-radius: 10px;
    padding: 7px;
    text-align: center;
    background-image: linear-gradient(grey, white, grey);
`;
