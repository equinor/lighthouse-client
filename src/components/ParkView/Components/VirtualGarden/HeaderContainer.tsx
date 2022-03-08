import { MemoExoticComponent } from 'react';
import { VirtualItem } from 'react-virtual';
import styled from 'styled-components';
import { Data } from '../../Models/data';
import { CustomHeaderView } from '../../Models/gardenOptions';

const HeaderRoot = styled.div`
    position: sticky;
    z-index: 1;
    top: 0;
`;

const Header = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 35px;
    will-change: transform;
    text-align: left;
    cursor: pointer;
    border-radius: 5px;
    background: #f7f7f7;
    border: 1px solid white;
`;
type HeaderContainerProps<T> = {
    columnVirtualizer: { virtualItems: VirtualItem[] };
    headerChild: MemoExoticComponent<(args: CustomHeaderView<T>) => JSX.Element>;
    garden: Data<T>;
    columnKey: string;
};
export const HeaderContainer = <T extends unknown>(props: HeaderContainerProps<T>) => {
    const { columnVirtualizer, garden, headerChild: HeaderChild } = props;

    return (
        <HeaderRoot>
            {columnVirtualizer.virtualItems.map((virtualColumn) => {
                return (
                    <Header
                        style={{
                            width: `${virtualColumn.size}px`,
                            transform: `translateX(${virtualColumn.start}px) translateY(0px)`,
                        }}
                    >
                        <HeaderChild garden={garden} columnKey="2" />
                    </Header>
                );
            })}
        </HeaderRoot>
    );
};
