import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const LayoutRoot = styled.div`
    height: 100%;
    width: 100%;
    overflow: auto;
`;
const LayoutContainer = styled.div<{ width: number; height: number; isScrolling: boolean }>`
    position: relative;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    pointer-events: ${(props) => (props.isScrolling ? 'none' : 'auto')};
`;
type LayoutProps = {
    columnTotalSize: number;
    rowTotalSize: number;
    parentRef: React.MutableRefObject<HTMLDivElement | null>;
    isScrolling: boolean;
};
/**
 * Main container of the virtualized garden.
 * Sets the component to fit the whole screen and enables scrolling when overflowing.
 * The inner div will be positioned relative and have the widths and heights from
 * useVirtual hooks.
 * pointerEvents is just for optimization, turned off when user is scrolling.
 */
export const Layout = (props: PropsWithChildren<LayoutProps>) => {
    const { columnTotalSize, rowTotalSize, parentRef, isScrolling, children } = props;

    return (
        <LayoutRoot ref={parentRef}>
            <LayoutContainer
                width={columnTotalSize}
                height={rowTotalSize}
                isScrolling={isScrolling}
            >
                {children}
            </LayoutContainer>
        </LayoutRoot>
    );
};
