import styled from 'styled-components';
import { GroupBase, OptionsOrGroups, SingleValue, Theme } from 'react-select';
import AsyncSelect from 'react-select/async';
import { searchPcs } from '../../../Api/Search/PCS/searchPcs';
import {
    applyEdsComponents,
    applyEdsStyles,
    applyEDSTheme,
} from '../../SearchableDropdown/applyEds';
import { useRef, useState } from 'react';
import { TypedSelectOption } from '../../../Api/Search/searchType';
import { SearchableDropdownWrapper } from '../../SearchableDropdown/SearchableDropdownWrapper';

interface PCSLinkProps {
    setOriginId: (originId: string | undefined) => void;
    originId: string | undefined;
}

export const SearchSWCR = ({ setOriginId, originId }: PCSLinkProps): JSX.Element => {
    const [apiErrors, setApiErrors] = useState<string[]>([]);
    const controller = useRef(new AbortController());
    const origin: TypedSelectOption | null = originId
        ? {
            label: originId,
            value: originId,
            type: 'SWCR',
            searchValue: originId,
            object: originId,
        }
        : null;

    const loadOptions = async (
        inputValue: string,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => {
        controller.current.abort();
        controller.current = new AbortController();
        const options: TypedSelectOption[] = [];

        try {
            await (
                await searchPcs(inputValue, 'SWCR', controller.current.signal)
            ).map((x) => options.push(x));
        } catch (e) {
            setApiErrors((prev) => [...prev, 'swcr']);
        }
        if (options.length > 0) {
            callback(options);
        }
    };

    return (
        <>
            {apiErrors &&
                apiErrors.length > 0 &&
                apiErrors.map((name) => {
                    return <ErrorWrapper key={name}>Failed to fetch {name}</ErrorWrapper>;
                })}

            <Inline>
                <SearchableDropdownWrapper>
                    <AsyncSelect
                        cacheOptions={false}
                        defaultValue={origin}
                        loadOptions={loadOptions}
                        defaultOptions={false}
                        styles={applyEdsStyles()}
                        components={applyEdsComponents()}
                        placeholder={``}
                        noOptionsMessage={(obj: { inputValue: string }) => {
                            if (!obj.inputValue || obj.inputValue.length === 0) {
                                return <></>;
                            } else {
                                return <div>No results</div>;
                            }
                        }}
                        isClearable
                        onChange={(newValue: SingleValue<TypedSelectOption>) => {
                            setOriginId(newValue?.value ?? undefined);
                        }}
                        onInputChange={() => {
                            setApiErrors([]);
                        }}
                        theme={(theme: Theme) => applyEDSTheme(theme)}
                    />
                </SearchableDropdownWrapper>
            </Inline>
        </>
    );
};

const Inline = styled.span`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
`;

const ErrorWrapper = styled.div`
    font-size: 12px;
    color: red;
`;
