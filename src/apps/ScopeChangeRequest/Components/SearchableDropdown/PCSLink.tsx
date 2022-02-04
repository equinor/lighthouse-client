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
    const [apiErrors, setApiErrors] = useState<string[]>([]);
    const controller = useRef(new AbortController());

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
        controller.current.abort();
        controller.current = new AbortController();

        const options: TypedSelectOption[] = [];
        let sorted: TypedSelectOption[] = [];

        await (
            await searchPcs(inputValue, 'system', controller.current.signal)
        ).forEach((x) => options.push(x));

        await (
            await searchPcs(inputValue, 'commpkg', controller.current.signal)
        ).forEach((x) => options.push(x));
        sorted = options.sort((a: TypedSelectOption, b: TypedSelectOption) =>
            sort(a, b, inputValue)
        );

        if (sorted.length > 0) {
            callback(sorted);
        }

        await (
            await searchPcs(inputValue, 'area', controller.current.signal)
        ).forEach((x) => options.push(x));
        sorted = options.sort((a: TypedSelectOption, b: TypedSelectOption) =>
            sort(a, b, inputValue)
        );

        if (sorted.length > 0) {
            callback(sorted);
        }

        await (
            await searchPcs(inputValue, 'discipline', controller.current.signal)
        ).forEach((x) => options.push(x));
        sorted = options.sort((a: TypedSelectOption, b: TypedSelectOption) =>
            sort(a, b, inputValue)
        );

        if (sorted.length > 0) {
            callback(sorted);
        }

        await (
            await searchPcs(inputValue, 'tag', controller.current.signal)
        ).forEach((x) => options.push(x));
        sorted = options.sort((a: TypedSelectOption, b: TypedSelectOption) =>
            sort(a, b, inputValue)
        );

        if (sorted.length > 0) {
            callback(sorted);
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
                            width: '-webkit-fill-available',
                            borderBottom: '5px solid #6F6F6F',
                            fontSize: '16px',
                        }}
                    >
                        <AsyncSelect
                            cacheOptions={false}
                            loadOptions={loadOptions}
                            defaultOptions={false}
                            components={applyEdsComponents()}
                            isMulti={true}
                            placeholder={`Type to search..`}
                            isClearable={false}
                            value={relatedObjects}
                            onInputChange={() => {
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
                                const TypeIcon = getIcon(x);
                                return (
                                    <Chip key={x.value}>
                                        {TypeIcon}
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

function getIcon(x: TypedSelectOption): JSX.Element | null {
    if (x.type === 'area') {
        return <Icon name="pin_drop" color={tokens.colors.interactive.primary__resting.hex} />;
    }

    if (x.type === 'discipline') {
        return <Icon name="school" color={tokens.colors.interactive.primary__resting.hex} />;
    }

    if (x.type === 'tag') {
        return <Icon name="tag" color={tokens.colors.interactive.primary__resting.hex} />;
    }
    return null;
}

const Inline = styled.span`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
`;

const Chip = styled.div`
    text-align: center;
    display: flex;
    width: fit-content;
    align-items: center;
    font-size: 16px;
    padding: 5px;
    background-color: ${tokens.colors.ui.background__light.hex};
    border-radius: 35%;
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
