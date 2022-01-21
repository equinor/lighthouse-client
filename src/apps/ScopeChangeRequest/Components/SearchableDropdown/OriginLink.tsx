import { useRef, useState } from 'react';
import { GroupBase, OptionsOrGroups, SingleValue, Theme } from 'react-select';
import AsyncSelect from 'react-select/async';
import styled from 'styled-components';
import { useHttpClient } from '../../../../Core/Client/Hooks/useApiClient';
import { searchPcs } from '../../Api/Search/PCS/searchPcs';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { applyEdsComponents, applyEdsStyles, applyEDSTheme } from './applyEds';
import { sort } from './sort';

interface PCSLinkProps {
    originId: TypedSelectOption | undefined;
    setOriginId: React.Dispatch<React.SetStateAction<TypedSelectOption | undefined>>;
}

export const OriginLink = ({ originId, setOriginId }: PCSLinkProps): JSX.Element => {
    const { procosys } = useHttpClient();
    const [apiErrors, setApiErrors] = useState<string[]>([]);
    const debounce = useRef(new Date());

    const loadOptions = async (
        inputValue: string,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => {
        const none: TypedSelectOption = {
            label: 'None',
            searchValue: '',
            type: 'query',
            value: 'OOTA',
            object: {},
        };

        const options: TypedSelectOption[] = [];
        try {
            await (await searchPcs(inputValue, 'query', procosys)).map((x) => options.push(x));
        } catch (e) {
            setApiErrors((prev) => [...prev, 'queries']);
        } finally {
            const sorted = options.sort((a: TypedSelectOption, b: TypedSelectOption) =>
                sort(a, b, inputValue)
            );
            sorted.push(none);
            callback(sorted);
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
                        value={originId}
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
                        onChange={(newValue: SingleValue<TypedSelectOption>) => {
                            setOriginId(newValue ?? undefined);
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
