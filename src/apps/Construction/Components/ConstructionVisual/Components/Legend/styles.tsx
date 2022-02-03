import styled from 'styled-components';

export const List = styled.ul`
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin: 0;
    padding: 0;
`;
export const ListItem = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    margin-left: 10px;
`;
type ListTextProps = {
    color: string;
    isHidden?: boolean;
};
export const ListText = styled.p<ListTextProps>`
    color: ${(props) => props.color};
    text-decoration: ${(props) => (props.isHidden ? 'line-through' : 'none')};
    padding: 0;
    margin: 0;
`;
export type BoxProps = {
    strokeStyle: string;
    lineWidth: number;
    fillStyle: string;
    height: number;
};
export const AccumulatedBox = styled.span<Pick<BoxProps, 'strokeStyle'>>`
    width: 30px;
    display: inline-block;
    margin-right: 10px;
    border-bottom: ${(props) => `2px dashed ${props.strokeStyle}`};
`;
export const Box = styled.span<BoxProps>`
    width: 30px;
    display: inline-block;
    margin-right: 10px;
    background: ${(props) => props.fillStyle};
    border-color: ${(props) => props.strokeStyle};
    border-width: ${(props) => props.lineWidth}px;
    height: ${(props) => props.height}px;
`;
