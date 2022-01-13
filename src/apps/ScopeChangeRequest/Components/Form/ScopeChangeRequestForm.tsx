import { Button, Icon, SingleSelect } from '@equinor/eds-core-react';
import { GeneratedForm, useForm } from '@equinor/Form';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { scopeChangeRequestSchema } from '../../Schemas/scopeChangeRequestSchema';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { useMutation } from 'react-query';
import { getScopeChangeById, postScopeChange } from '../../Api/';
import { openSidesheet } from '@equinor/sidesheet';
import { ScopeChangeSideSheet } from '../CustomSidesheet';
import { Field } from '../DetailView/Components/Field';
import { Upload } from '../Upload';
import { tokens } from '@equinor/eds-tokens';
import AsyncSelect from 'react-select/async';
import { ActionMeta, InputActionMeta, MultiValue, OptionsOrGroups, Theme } from 'react-select';
import { getOrigins } from '../../Api/getOrigins';
import { searchQueryOrigin } from '../../Api/PCS/searchQuery';

import { searchPcs } from '../../Api/PCS/searchPcs';

interface ScopeChangeRequestFormProps {
    closeScrim: (force?: boolean) => void;
    setHasUnsavedChanges: (value: boolean) => void;
}

interface CreateScopeChangeProps {
    draft: boolean;
}

export const ScopeChangeRequestForm = ({
    closeScrim,
    setHasUnsavedChanges,
}: ScopeChangeRequestFormProps): JSX.Element => {
    const formData = useForm<ScopeChangeRequest>(scopeChangeRequestSchema);
    let scopeChangeId: string | undefined = undefined;
    const [origin, setOrigin] = useState<string | undefined | null>();
    const linkOptions = ['Tag', 'CommPkg', 'System'];
    const [tagCommPkgSystem, setTagCommPkgSystem] = useState<string | undefined | null>(
        linkOptions[0]
    );

    const [tags, setTags] = useState<SelectOption[] | undefined>();
    const [commPkgs, setCommPkgs] = useState<SelectOption[] | undefined>();
    const [systems, setSystems] = useState<SelectOption[] | undefined>();

    const createScopeChangeMutation = async ({ draft }: CreateScopeChangeProps) => {
        scopeChangeId = await postScopeChange(formData.data, draft);
        formData.reset();
    };

    const { mutate, error } = useMutation(createScopeChangeMutation, {
        retry: 2,
        retryDelay: 2,
    });

    const redirect = async () => {
        if (!scopeChangeId) return;

        openSidesheet(ScopeChangeSideSheet, await getScopeChangeById(scopeChangeId));
        closeScrim();
    };
    useEffect(() => {
        redirect();
    }, [scopeChangeId]);

    useEffect(() => {
        setHasUnsavedChanges(formData.getChangedData() !== undefined);
    }, [formData, setHasUnsavedChanges]);

    const SubmitButton = () => {
        return (
            <Button disabled={!formData.isValidForm()} onClick={() => mutate({ draft: false })}>
                Initiate request
            </Button>
        );
    };

    const SaveButton = () => {
        return (
            <Button
                disabled={!formData.isValidForm()}
                variant={'outlined'}
                onClick={() => mutate({ draft: true })}
            >
                Save as draft
            </Button>
        );
    };

    interface SelectOption {
        value: string;
        label: string;
    }

    const loadOptions = async (inputValue: string, callback: (options: SelectOption[]) => void) => {
        if (!tagCommPkgSystem) return;
        callback(await searchPcs(inputValue, tagCommPkgSystem));
    };

    return (
        <FormContainer>
            <TitleHeader>
                <span style={{ fontSize: '28px' }}>Create scope change request</span>
                <Icon
                    onClick={() => closeScrim()}
                    name="close"
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            </TitleHeader>
            <GeneratedForm
                formData={formData}
                editMode={false}
                buttons={[SubmitButton, SaveButton]}
            >
                <Inline>
                    <SingleSelect
                        style={{ width: '100%' }}
                        label="Type"
                        items={linkOptions}
                        selectedOption={tagCommPkgSystem || ''}
                        handleSelectedItemChange={(e) => {
                            setTagCommPkgSystem(e.selectedItem);
                        }}
                    />
                    <div style={{ width: '5px' }} />

                    <AsyncSelect
                        cacheOptions={false}
                        isDisabled={!tagCommPkgSystem}
                        loadOptions={loadOptions}
                        defaultOptions={false}
                        isMulti
                        isClearable={false}
                        controlShouldRenderValue={false}
                        onChange={(newValue: MultiValue<SelectOption>) => {
                            switch (tagCommPkgSystem) {
                                case 'Tag':
                                    setTags((prev) => [
                                        ...(prev || []),
                                        { ...newValue[newValue.length - 1] },
                                    ]);
                                    break;

                                case 'CommPkg':
                                    setCommPkgs((prev) => [
                                        ...(prev || []),
                                        { ...newValue[newValue.length - 1] },
                                    ]);
                                    break;

                                case 'System':
                                    setSystems((prev) => [
                                        ...(prev || []),
                                        { ...newValue[newValue.length - 1] },
                                    ]);
                                    break;
                            }
                        }}
                        theme={(theme: Theme) => ({
                            ...theme,
                            borderRadius: 2,
                            colors: {
                                ...theme.colors,
                                neutral0: `${tokens.colors.ui.background__light.rgba}`,
                                primary25: `${tokens.colors.ui.background__medium.rgba}`,
                                primary: `${tokens.colors.interactive.primary__resting.rgba}`,
                                primary50: 'pink',
                                primary75: 'pink',
                                danger: 'pink',
                                dangerLight: 'pink',
                                neutral5: 'pink',
                                neutral20: `${tokens.colors.interactive.primary__resting.rgba}`,
                                neutral30: 'green',
                                neutral40: `${tokens.colors.interactive.primary__resting.rgba}`,
                                neutral50: 'pink',
                                neutral60: `${tokens.colors.interactive.primary__resting.rgba}`,
                                neutral70: 'green',
                                neutral80: `${tokens.colors.interactive.primary__resting.rgba}`,
                            },
                        })}
                    /**
                     * neutral 10 overlay color over selected items
                     * netutral 20 cross and dropdown button
                     * neutral 40 onHover neutral 20
                     * neutral 80 onHover when bar is open
                     *
                     */
                    />
                </Inline>

                {tags?.map((x) => {
                    return <div key={x.value}>Tag: {x.value}</div>;
                })}
                {commPkgs?.map((x) => {
                    return <div key={x.value}>CommPkg: {x.value}</div>;
                })}
                {systems?.map((x) => {
                    return <div key={x.value}>System: {x.value}</div>;
                })}

                <Field label="Attachments" value={<Upload />} />
            </GeneratedForm>

            {error && <p> Something went wrong, please check your connection and try again</p>}
        </FormContainer>
    );
};

const TitleHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

const Inline = styled.span`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
`;

const FormContainer = styled.div``;
