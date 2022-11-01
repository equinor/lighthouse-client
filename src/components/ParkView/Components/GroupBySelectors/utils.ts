import { FieldSettings } from '../../Models/fieldSettings';

export const getFieldSettingsKeyFromLabel = <T extends unknown>(
    label: string,
    fieldSettings: FieldSettings<T, string>
): string => Object.keys(fieldSettings).find((k) => fieldSettings[k]?.label === label) || label;

export const getFieldSettingsLabelFromKey = <T extends unknown>(
    key: string,
    fieldSettings: FieldSettings<T, string>
): string => fieldSettings?.[key]?.label || key;

type HasNextArgs<T> = {
    groupingOptions: string[];
    fieldSettings: FieldSettings<T, string>;
    groupByKeys: (keyof T)[];
};
export const hasNextGroupByOptions = <T extends Record<PropertyKey, unknown>>({
    groupingOptions,
    fieldSettings,
    groupByKeys,
}: HasNextArgs<T>): boolean => {
    return (
        groupingOptions &&
        groupingOptions.length > 0 &&
        !fieldSettings[groupByKeys.at(-1)]?.lastStep
    );
};
