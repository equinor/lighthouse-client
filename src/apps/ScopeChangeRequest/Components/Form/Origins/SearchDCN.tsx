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

interface PCSLinkProps {
    setOriginId: (originId: string | undefined) => void;
}

export const SearchDCN = ({ setOriginId }: PCSLinkProps): JSX.Element => {
    const [apiErrors, setApiErrors] = useState<string[]>([]);
    const debounce = useRef(new Date());

    const loadOptions = async (
        inputValue: string,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => {
        const options: TypedSelectOption[] = [];

        try {
            await (await searchPcs(inputValue, 'dcn')).map((x) => options.push(x));
        } catch (e) {
            setApiErrors((prev) => [...prev, 'DCN']);
        }

        callback(options);
    };

    return (
        <>
            {apiErrors &&
                apiErrors.length > 0 &&
                apiErrors.map((name) => {
                    return <ErrorWrapper key={name}>Failed to fetch {name}</ErrorWrapper>;
                })}

            <Inline>
                <div
                    style={{ width: '300px', borderBottom: '5px solid #6F6F6F', fontSize: '16px' }}
                >
                    <AsyncSelect
                        cacheOptions={false}
                        // loadOptions={loadOptions}
                        loadOptions={(
                            inputValue: string,
                            callback: (
                                options: OptionsOrGroups<
                                    TypedSelectOption,
                                    GroupBase<TypedSelectOption>
                                >
                            ) => void
                        ) => {
                            const start = debounce.current;
                            setTimeout(() => {
                                if (start === debounce.current) {
                                    loadOptions(inputValue, callback);
                                }
                            }, 300);
                            return;
                        }}
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
                        onChange={(newValue: SingleValue<TypedSelectOption>) => {
                            setOriginId(newValue?.value ?? undefined);
                        }}
                        onInputChange={() => {
                            debounce.current = new Date();
                            setApiErrors([]);
                        }}
                        theme={(theme: Theme) => applyEDSTheme(theme)}
                    />
                </div>
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
