import styled from 'styled-components';
import AsyncSelect from 'react-select/async';
import { applyEDSTheme, applyEdsComponents, applyEdsStyles } from './applyEds';
import {
    ActionMeta,
    GroupBase,
    MultiValue,
    OptionsOrGroups,
    PropsValue,
    SingleValue,
    Theme,
} from 'react-select';

interface SearchableDropdownProps<T> {
    onChange?:
    | ((newValue: MultiValue<T> | SingleValue<T>, actionMeta: ActionMeta<T>) => void)
    | undefined;
    value?: PropsValue<T>;
    loadOptions?: (
        inputValue: string,
        callback: (options: OptionsOrGroups<T, GroupBase<T>>) => void
    ) => void;
    controlShouldRenderValue: boolean;
    isDisabled?: boolean;
    isMulti?: false | undefined;
}

export function SearchableDropdown<T>({
    controlShouldRenderValue,
    loadOptions,
    onChange,
    value,
    isDisabled,
    isMulti,
}: SearchableDropdownProps<T>): JSX.Element {
    return (
        <Wrapper>
            <AsyncSelect<T>
                loadOptions={loadOptions}
                styles={applyEdsStyles()}
                controlShouldRenderValue={controlShouldRenderValue}
                components={{ ...applyEdsComponents() }}
                value={value}
                isMulti={isMulti}
                onChange={onChange}
                noOptionsMessage={(obj: { inputValue: string }) => {
                    if (!obj.inputValue || obj.inputValue.length === 0) {
                        return <></>;
                    } else {
                        return <div>No results</div>;
                    }
                }}
                isDisabled={isDisabled}
                isClearable
                theme={(theme: Theme) => applyEDSTheme(theme)}
            />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: '-webkit-fill-available';
    border-bottom: '5px solid #6F6F6F';
    font-size: '16px';
    height: '11px';
`;
