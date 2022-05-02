import {
    ActionMeta,
    GroupBase,
    InputActionMeta,
    OptionsOrGroups,
    SingleValue,
    Theme,
} from 'react-select';
import AsyncSelect from 'react-select/async';
import { applyEdsComponents, applyEdsStyles, applyEDSTheme } from './SearchableDropdown/applyEds';
import { TypedSelectOption } from '../../api/Search/searchType';
import { SearchableDropdownWrapper } from './SearchableDropdown/SearchableDropdownWrapper';
import { useCancellationToken } from '../../../../hooks/cancellationToken/useCancellationToken';

interface SearchableSingleSelectProps {
    loadOptions: (
        inputValue: string,
        signal: AbortSignal,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => Promise<void>;
    defaultValue?: TypedSelectOption | null;
    onChange?: (
        newValue: SingleValue<TypedSelectOption>,
        actionMeta: ActionMeta<TypedSelectOption>
    ) => void;
    onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
    placeholder?: string;
    isDisabled?: boolean;
}

export const SearchableSingleSelect = ({
    loadOptions,
    defaultValue,
    onChange,
    onInputChange,
    isDisabled,
}: SearchableSingleSelectProps): JSX.Element => {
    const { abort, getSignal } = useCancellationToken();

    const search = async (
        inputValue: string,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => {
        abort();
        await loadOptions(inputValue, getSignal(), callback);
    };

    return (
        <SearchableDropdownWrapper>
            <AsyncSelect<TypedSelectOption>
                cacheOptions={false}
                defaultValue={defaultValue}
                isDisabled={isDisabled}
                loadOptions={search}
                defaultOptions={false}
                styles={applyEdsStyles()}
                components={applyEdsComponents()}
                placeholder={`Type to search..`}
                noOptionsMessage={(obj: { inputValue: string }) => {
                    if (!obj.inputValue || obj.inputValue.length === 0) {
                        return <></>;
                    } else {
                        return <div>No results</div>;
                    }
                }}
                isClearable
                onChange={onChange}
                onInputChange={onInputChange}
                theme={(theme: Theme) => applyEDSTheme(theme)}
            />
        </SearchableDropdownWrapper>
    );
};
