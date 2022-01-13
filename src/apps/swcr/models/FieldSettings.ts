import { GetKeyFunction } from '../../../Core/WorkSpace/src/WorkSpaceApi/State';

export type FieldSetting<ItemType> = {
    key?: keyof ItemType;
    label?: string;
    getKey?: GetKeyFunction<ItemType>;
};

/**
 * Define Fields that should be used in garden.
 * ItemType and ExtendedFields (optional) are combined on keys, to create a partial record for fields.
 * Garden will use all specified fields to build its group by selection.
 * Fields that are not specified, will be ignored
 *
 * @template ItemType  Base model for item/package used. Is the type that is passed to functions.
 * @template ExtendedFields (optional) string literal that defines fields that does not exist on the base model.
 */
export type FieldSettings<ItemType, ExtendedFields extends string = never> = Partial<
    Record<keyof ItemType | ExtendedFields, FieldSetting<ItemType>>
>;
