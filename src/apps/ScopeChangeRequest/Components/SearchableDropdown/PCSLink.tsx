import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useMemo, useRef, useState } from 'react';
import { ActionMeta, GroupBase, MultiValue, OptionsOrGroups, Theme } from 'react-select';
import AsyncSelect from 'react-select/async';
import styled from 'styled-components';
import { searchPcs } from '../../Api/Search/PCS/searchPcs';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { applyEdsComponents, applyEdsStyles, applyEDSTheme } from './applyEds';
import { sort } from './sort';



interface PCSLinkProps {
    relatedObjects: TypedSelectOption[];
    setRelatedObjects: React.Dispatch<React.SetStateAction<TypedSelectOption[]>>;
}

export const PCSLink = ({ relatedObjects, setRelatedObjects }: PCSLinkProps): JSX.Element => {
    const { procosys } = useHttpClient();
    const [apiErrors, setApiErrors] = useState<string[]>([]);
    const debounce = useRef(new Date());

    const addRelatedObject = (value: TypedSelectOption) =>
        setRelatedObjects((prev) => [...prev, value]);

    const removeRelatedObject = (value: string) =>
        setRelatedObjects((prev) => prev.filter((x) => x.value !== value));

    const objects = useMemo(() => {
        return relatedObjects.sort(function (a, b) {
            if (a.type < b.type) {
                return -1;
            }
            if (a.type > b.type) {
                return 1;
            }
            return 0;
        });
    }, [relatedObjects]);

    const loadOptions = async (
        inputValue: string,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => {
        const options: TypedSelectOption[] = [];
        try {
            await (await searchPcs(inputValue, 'system', procosys)).forEach((x) => options.push(x));
            const sorted = options.sort((a: TypedSelectOption, b: TypedSelectOption) =>
                sort(a, b, inputValue)
            );

            if (sorted.length > 0) {
                callback(sorted);
            }
        } catch (e) {
            console.warn(e);
            setApiErrors((prev) => [...prev, 'systems']);
        }

        try {
            await (
                await searchPcs(inputValue, 'commpkg', procosys)
            ).forEach((x) => options.push(x));
            const sorted = options.sort((a: TypedSelectOption, b: TypedSelectOption) =>
                sort(a, b, inputValue)
            );

            if (sorted.length > 0) {
                callback(sorted);
            }
        } catch (e) {
            console.warn(e);
            setApiErrors((prev) => [...prev, 'comm pkgs']);
        }

        try {
            await (await searchPcs(inputValue, 'tag', procosys)).forEach((x) => options.push(x));
            const sorted = options.sort((a: TypedSelectOption, b: TypedSelectOption) =>
                sort(a, b, inputValue)
            );

            if (sorted.length > 0) {
                callback(sorted);
            }
        } catch (e) {
            console.warn(e);
            setApiErrors((prev) => [...prev, 'tags']);
        }
    };

    return (
        <Wrapper>
            <Column>
                {apiErrors &&
                    apiErrors.length > 0 &&
                    apiErrors.map((name) => {
                        return <ErrorWrapper key={name}>Failed to fetch {name}</ErrorWrapper>;
                    })}
                <Inline>
                    <div
                        style={{
                            width: '653.75px',
                            borderBottom: '5px solid #6F6F6F',
                            fontSize: '16px',
                        }}
                    >
                        <AsyncSelect
                            cacheOptions={false}
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
                            components={applyEdsComponents()}
                            isMulti
                            placeholder={`Type to search..`}
                            isClearable={false}
                            value={relatedObjects}
                            onInputChange={() => {
                                debounce.current = new Date();
                                setApiErrors([]);
                            }}
                            styles={applyEdsStyles()}
                            controlShouldRenderValue={false}
                            onChange={(
                                newValue: MultiValue<TypedSelectOption>,
                                actionMeta: ActionMeta<TypedSelectOption>
                            ) => {
                                if (!actionMeta.option) return;
                                addRelatedObject(actionMeta.option);
                            }}
                            theme={(theme: Theme) => applyEDSTheme(theme)}
                        />
                    </div>
                </Inline>

                <Column>
                    {objects && objects.length > 0 && (
                        <>
                            {objects.map((x) => {
                                return (
                                    <Chip key={x.value}>
                                        {x.label}
                                        <Icon
                                            color={tokens.colors.interactive.primary__resting.rgba}
                                            onClick={() => {
                                                removeRelatedObject(x.value);
                                            }}
                                            name="clear"
                                        />
                                    </Chip>
                                );
                            })}
                        </>
                    )}
                </Column>
            </Column>
        </Wrapper>
    );
};

const Inline = styled.span`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
`;

const Chip = styled.div`
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    padding: 5px;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

const Wrapper = styled.div`
    width: 100%;
`;

const ErrorWrapper = styled.div`
    font-size: 12px;
    color: red;
`;
