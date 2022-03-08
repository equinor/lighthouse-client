import styled from 'styled-components';

type StatusProps = {
    color: string;
};
/**
 * Styled component to display a package status with circular background color.
 */
export const PopoverStatus = styled.div<StatusProps>`
    width: 40px;
    height: 24px;
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
