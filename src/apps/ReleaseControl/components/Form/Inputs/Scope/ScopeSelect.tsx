import { ActionMeta, GroupBase, MultiValue, OptionsOrGroups, Theme } from 'react-select';
import AsyncSelect from 'react-select/async';
import { TypedSelectOption } from '../../../../../ScopeChangeRequest/types/search/searchType';
import {
    applyEdsComponents,
    applyEdsStyles,
    applyEDSTheme,
} from '../../../../../ScopeChangeRequest/Components/Inputs/SearchableDropdown/applyEds';

export interface SelectProps {
    loadOptions: (
        inputValue: string,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => void;
    value: TypedSelectOption[];
    onInputChange: () => void;
    onChange: (
        newValue: MultiValue<TypedSelectOption>,
        actionMeta: ActionMeta<TypedSelectOption>
    ) => void;
    disabled?: boolean;
}

export const Select = ({ loadOptions, onChange, onInputChange, value, disabled }: SelectProps) => (
    <AsyncSelect
        cacheOptions={false}
        loadOptions={loadOptions}
        defaultOptions={false}
        components={applyEdsComponents()}
        isMulti={true}
        placeholder={`Type to search..`}
        isClearable={false}
        value={value}
        styles={applyEdsStyles()}
        controlShouldRenderValue={false}
        onInputChange={onInputChange}
        onChange={onChange}
        theme={(theme: Theme) => applyEDSTheme(theme)}
        isDisabled={disabled}
    />
);
