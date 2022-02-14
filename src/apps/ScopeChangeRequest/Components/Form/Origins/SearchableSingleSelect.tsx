import {
    ActionMeta,
    GroupBase,
    InputActionMeta,
    OptionsOrGroups,
    SingleValue,
    Theme,
} from 'react-select';
import AsyncSelect from 'react-select/async';
import {
    applyEdsComponents,
    applyEdsStyles,
    applyEDSTheme,
} from '../../SearchableDropdown/applyEds';
import { TypedSelectOption } from '../../../Api/Search/searchType';
import { SearchableDropdownWrapper } from '../../SearchableDropdown/SearchableDropdownWrapper';
import { useCancellationToken } from '../../../Hooks/useCancellationToken';

interface PCSLinkProps {
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
}

export const SearchableSingleSelect = ({
    loadOptions,
    defaultValue,
    onChange,
    onInputChange,
}: PCSLinkProps): JSX.Element => {
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
                loadOptions={search}
                defaultOptions={false}
                styles={applyEdsStyles()}
                components={applyEdsComponents()}
                placeholder={`16121`}
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
