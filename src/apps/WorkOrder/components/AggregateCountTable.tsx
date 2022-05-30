import { PropsWithChildren } from 'react';
import styled from 'styled-components';
const Count = styled.span`
    font-size: 12px;
    padding-left: 0.5rem;
`;
export const AggregateCountTable = ({ children }: PropsWithChildren<{}>) => {
    return <Count>{children}</Count>;
};
