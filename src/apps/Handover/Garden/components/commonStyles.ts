import styled from 'styled-components';
type StatusProps = {
    color: string;
    width?: number;
    height?: number;
};
export const Status = styled.div<StatusProps>`
    width: ${(props) => (props?.width ? `${props.width}px` : '40px')};
    height: ${(props) => (props?.height ? `${props.height}px` : '24px')};
    display: flex;
    align-self: center;
    border: none;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    border-radius: 12px;
    background: ${(p) => p.color};
`;
