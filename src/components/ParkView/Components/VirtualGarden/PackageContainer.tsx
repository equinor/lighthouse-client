import styled from 'styled-components';
import { useVirtual, VirtualItem } from 'react-virtual/types';
const PackageRoot = styled.div`
    position: absolute;
    will-change: transform;
    top: 0;
    left: 0;
`;
type VirtualHookReturn = Pick<ReturnType<typeof useVirtual>, 'virtualItems' | 'scrollToIndex'>;
type PackageContainerProps<T> = {
    virtualRow: VirtualItem;
    columnVirtualizer: VirtualHookReturn;
    garden: any;
};
export const PackageContainer = <T extends unknown>(props: PackageContainerProps<T>) => {
    const { columnVirtualizer, garden, virtualRow } = props;
    return (
        <>
            {columnVirtualizer.virtualItems.map((virtualColumn) => {
                //TODO
                const gardenArr = Object.values(garden);
                const item = gardenArr[virtualColumn.index].items[virtualRow.index];
                if (!item) return null;

                return (
                    <PackageRoot
                        key={virtualColumn.index}
                        style={{
                            transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                            width: `${virtualColumn.size}px`,
                            height: `${virtualRow.size}px`,
                        }}
                        ref={(el) => {
                            virtualRow.measureRef(el);
                            virtualColumn.measureRef(el);
                        }}
                    >
                        {item.commpkgNo}
                    </PackageRoot>
                );
            })}
        </>
    );
};
