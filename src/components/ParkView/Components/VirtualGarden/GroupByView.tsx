import { Fragment, useCallback } from 'react';
import { DataSet } from '../../Models/data';
import { FieldSettings } from '../../Models/fieldSettings';
import { CustomItemView } from '../../Models/gardenOptions';
import { defaultSortFunction } from '../../Utils/utilities';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { useRefresh } from '../../hooks/useRefresh';
import { useExpand, useExpandDispatch } from './useExpand';
import { ActionType } from './ExpandProvider';
const Pack = styled.div`
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    margin: 0;
    align-items: center;
    margin-bottom: 4px;
    border: 1px solid ${tokens.colors.text.static_icons__tertiary.rgba};
    border-radius: 5px;
    color: ${tokens.colors.text.static_icons__default.rgba};

    cursor: pointer;

    :hover {
        opacity: 0.5;
    }
`;
type GroupByViewProps<T> = {
    group: DataSet<T>;
    packageChild: React.MemoExoticComponent<(args: CustomItemView<T>) => JSX.Element>;
    itemKey: keyof T;
    fieldSettings?: FieldSettings<T>;
    currentColumnKey: string;
    virtualRowIndex: number;
};
export const GroupByView = <T extends unknown>({
    group,
    packageChild,
    itemKey,
    fieldSettings,
    currentColumnKey,
    virtualRowIndex,
}: GroupByViewProps<T>) => {
    const refresh = useRefresh();
    const subGroupKeys = Object.keys(group.subGroups);
    const PackageChild = packageChild;

    const expand = useExpand();

    const expandGroup = useExpandDispatch();

    const handleExpand = (index: number, key: string) => {
        expandGroup({
            type: ActionType.EXPAND_ROW,
            index,
            key,
        });
    };
    return (
        <>
            <Pack
                key={group.value + group.groupKey}
                onClick={() => handleExpand(virtualRowIndex, `${group.value}_${currentColumnKey}`)}
            >
                {group.value}({group.count})
            </Pack>
            {group.items[0] != null &&
            expand?.expandedRows?.[`${group.value}_${currentColumnKey}`]?.isExpanded ? (
                <>
                    {group.items.map((item, index) => (
                        <div key={index}>
                            <PackageChild
                                columnExpanded={
                                    expand?.expandedColumns?.[currentColumnKey]?.isExpanded ?? false
                                }
                                data={item}
                                itemKey={itemKey.toString()}
                                onClick={() => {}}
                            />
                        </div>
                    ))}
                </>
            ) : (
                <div>
                    {subGroupKeys
                        .sort(
                            fieldSettings?.[group.subGroups?.[0]?.groupKey]?.getColumnSort ||
                                defaultSortFunction
                        )
                        .map((groupKey) => (
                            <GroupByView<T>
                                key={group.subGroups[groupKey].value}
                                group={group.subGroups[groupKey]}
                                packageChild={packageChild}
                                itemKey={itemKey}
                                fieldSettings={fieldSettings}
                                currentColumnKey={currentColumnKey}
                                virtualRowIndex={virtualRowIndex}
                            />
                        ))}
                </div>
            )}
        </>
    );
};
