import styled from 'styled-components';

export const Root = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 5px;
    position: relative;
`;
export type WorkOrderItemProps = {
    backgroundColor: string;
    textColor: string;
    background: string;
    progressBackground: string;
    isSelected: boolean;
};
//@ts-ignore
export const WorkOrderWrapper = styled.div<WorkOrderItemProps>`
    display: grid;
    grid-template-columns: 15px 3fr auto;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    background: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    min-width: 150px;
    cursor: pointer;
    height: 100%;
    border-radius: 5px;
    font-weight: 500;
    font-size: 13px;
    padding-left: 20px;
    padding-right: 2px;
    outline: ${(props) => (props.isSelected ? '2px dashed green' : '')};
    outline-offset: ${(props) => (props.isSelected ? '2px' : '')};

    ::before {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        border-radius: 10px;
        background: ${(props) => props.progressBackground};
        content: ' ';
    }
`;

type SizesProps = {
    size: 'small' | 'medium' | 'large';
    color: string;
};
export const Sizes = styled.div<SizesProps>`
    position: absolute;
    top: 0px;
    left: 4px;
    width: 10px;
    height: 2px;
    border-radius: 2px;
    box-shadow: ${(props) =>
        props.size === 'large'
            ? `0px 5px 0px 0px ${props.color}, 0px 11px 0px 0px ${props.color}, 0px 17px 0px 0px ${props.color}`
            : props.size === 'medium'
            ? `0px 11px 0px 0px ${props.color}, 0px 17px 0px 0px ${props.color}`
            : ` 0px 17px 0px 0px ${props.color}`};
`;

export const ItemText = styled.div`
    grid-column: 2/3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

type StatusCirclesProps = {
    matColor: string;
    mccrColor: string;
};
export const StatusCircles = styled.div<StatusCirclesProps>`
    display: flex;
    grid-column: 3/4;
    justify-content: end;
    align-items: center;

    ::before {
        width: 12px;
        height: 12px;
        border: 1px solid white;
        background-color: ${(props) => props.matColor};
        border-radius: 50%;
        margin: 0px 1px;
        content: ' ';
    }
    ::after {
        width: 12px;
        height: 12px;
        border: 1px solid white;
        background-color: ${(props) => props.mccrColor};
        border-radius: 50%;
        margin: 0px 1px;
        content: ' ';
    }
`;
