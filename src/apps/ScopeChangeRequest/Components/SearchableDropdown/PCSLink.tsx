import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useApiClient } from '../../../../Core/Client/Hooks/useApiClient';
import { tokens } from '@equinor/eds-tokens';
import { Icon, SingleSelect } from '@equinor/eds-core-react';
import {
    ActionMeta,
    GroupBase,
    InputActionMeta,
    InputProps,
    MultiValue,
    Theme,
} from 'react-select';
import AsyncSelect from 'react-select/async';
import { searchPcs } from '../../Api/PCS/searchPcs';
import { applyEDSTheme, applyEdsComponents, applyEdsStyles } from './applyEds';

interface SelectOption {
    label: string;
    value: string;
}

interface PCSLinkProps {
    tags: SelectOption[];
    setTags: React.Dispatch<React.SetStateAction<SelectOption[]>>;
    commPkgs: SelectOption[];
    setCommPkgs: React.Dispatch<React.SetStateAction<SelectOption[]>>;
    systems: SelectOption[];
    setSystems: React.Dispatch<React.SetStateAction<SelectOption[]>>;
}

export const PCSLink = ({
    commPkgs,
    systems,
    tags,
    setCommPkgs,
    setTags,
    setSystems,
}: PCSLinkProps): JSX.Element => {
    const linkOptions = ['Tag', 'CommPkg', 'System'];
    const [tagCommPkgSystem, setTagCommPkgSystem] = useState<string | undefined | null>(
        linkOptions[0]
    );

    const { procosys } = useApiClient();

    const addTag = (value: SelectOption) => setTags((prev) => [...prev, value]);
    const addSystem = (value: SelectOption) => setSystems((prev) => [...prev, value]);
    const addCommPkg = (value: SelectOption) => setCommPkgs((prev) => [...prev, value]);

    const removeTag = (value: string) => setTags(tags.filter((x) => x.value !== value));
    const removeSystem = (value: string) => setSystems(systems.filter((x) => x.value !== value));
    const removeCommPkg = (value: string) => setCommPkgs(commPkgs.filter((x) => x.value !== value));

    const loadOptions = async (inputValue: string, callback: (options: SelectOption[]) => void) => {
        if (!tagCommPkgSystem) return;
        callback(await searchPcs(inputValue, tagCommPkgSystem, procosys));
    };

    const selectedOptions = useMemo(() => {
        return [...tags, ...commPkgs, ...systems];
    }, [tags, systems, commPkgs]);

    return (
        <Wrapper>
            <Column>
                <Inline>
                    <SingleSelect
                        style={{ width: '150px' }}
                        label=""
                        items={linkOptions}
                        selectedOption={tagCommPkgSystem || ''}
                        handleSelectedItemChange={(e) => {
                            setTagCommPkgSystem(e.selectedItem);
                        }}
                    />
                    <div style={{ width: '5px' }} />

                    <div
                        style={{
                            width: '653.75px',
                            borderBottom: '5px solid #6F6F6F',
                            fontSize: '16px',
                        }}
                    >
                        <AsyncSelect
                            cacheOptions={false}
                            isDisabled={!tagCommPkgSystem}
                            loadOptions={loadOptions}
                            defaultOptions={false}
                            components={applyEdsComponents()}
                            isMulti
                            placeholder={`Type to search..`}
                            isClearable={false}
                            value={selectedOptions}
                            styles={applyEdsStyles()}
                            controlShouldRenderValue={false}
                            onChange={(
                                newValue: MultiValue<SelectOption>,
                                actionMeta: ActionMeta<SelectOption>
                            ) => {
                                if (!actionMeta.option) return;
                                switch (tagCommPkgSystem) {
                                    case 'Tag':
                                        addTag(actionMeta.option);
                                        break;

                                    case 'CommPkg':
                                        addCommPkg(actionMeta.option);
                                        break;

                                    case 'System':
                                        addSystem(actionMeta.option);
                                        break;
                                }
                            }}
                            theme={(theme: Theme) => applyEDSTheme(theme)}
                        />
                    </div>
                </Inline>

                <Column>
                    {selectedOptions && selectedOptions.length > 0 && (
                        <>
                            {selectedOptions.map((x) => {
                                return (
                                    <Chip key={x.value}>
                                        {x.label}
                                        <Icon
                                            color={tokens.colors.interactive.primary__resting.rgba}
                                            onClick={() => {
                                                removeTag(x.value);
                                                removeSystem(x.value);
                                                removeCommPkg(x.value);
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
