import { Button, Icon } from '@equinor/eds-core-react';
import { GeneratedForm, useForm } from '@equinor/Form';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { scopeChangeRequestSchema } from '../../Schemas/scopeChangeRequestSchema';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { useMutation } from 'react-query';
import { getScopeChangeById, postScopeChange } from '../../Api/';
import { openSidesheet } from '@equinor/sidesheet';
import { ScopeChangeSideSheet } from '../CustomSidesheet';
import { tokens } from '@equinor/eds-tokens';

import { useApiClient } from '@equinor/portal-client';
import { PCSLink } from '../SearchableDropdown/PCSLink';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { OriginLink } from '../SearchableDropdown/OriginLink';
import { clearActiveFactory } from '../../../../Core/DataFactory/Functions/clearActiveFactory';
import { ProcoSysTypes } from '../../Api/Search/PCS/searchPcs';

interface ScopeChangeRequestFormProps {
    closeScrim: (force?: boolean) => void;
    setHasUnsavedChanges: (value: boolean) => void;
}

interface CreateScopeChangeParams {
    draft: boolean;
}

export const ScopeChangeRequestForm = ({
    closeScrim,
    setHasUnsavedChanges,
}: ScopeChangeRequestFormProps): JSX.Element => {
    const formData = useForm<ScopeChangeRequest>(scopeChangeRequestSchema, {
        category: 'Hidden carryover',
        origin: 'Query',
        phase: 'IC',
    });
    const [origin, setOrigin] = useState<TypedSelectOption | undefined>();

    const [relatedObjects, setRelatedObjects] = useState<TypedSelectOption[]>([]);

    const { customApi } = useApiClient('api://df71f5b5-f034-4833-973f-a36c2d5f9e31/.default');

    const createScopeChangeMutation = async ({ draft }: CreateScopeChangeParams) => {
        const tags = filterElementsByType(relatedObjects, 'tag');
        const systems = filterElementsByType(relatedObjects, 'system');
        const commPkgs = filterElementsByType(relatedObjects, 'commpkg');
        // const areas = filterElementsByType(relatedObjects, 'area');
        // const disciplines = filterElementsByType(relatedObjects, 'discipline');

        const scID = await postScopeChange(
            {
                ...formData.data,
                TagNumbers: tags?.map((x) => x.value) || [],
                SystemIds: systems?.map((x) => x.value) || [],
                CommissioningPackageNumbers: commPkgs?.map((x) => x.value) || [],
            },
            draft,
            customApi
        );
        if (scID) {
            redirect(scID);
        }
    };

    const { mutate, error } = useMutation(createScopeChangeMutation, {
        retry: 2,
        retryDelay: 2,
    });

    const redirect = async (scopeChangeId: string) => {
        if (!scopeChangeId) return;

        openSidesheet(ScopeChangeSideSheet, await getScopeChangeById(scopeChangeId, customApi));
        clearActiveFactory();
    };

    useEffect(() => {
        setHasUnsavedChanges(formData.getChangedData() !== undefined);
    }, [formData, setHasUnsavedChanges]);

    const SubmitButton = () => {
        return (
            <Button disabled={!isValidForm} onClick={() => mutate({ draft: false })}>
                Initiate request
            </Button>
        );
    };

    const SaveButton = () => {
        return (
            <Button
                disabled={!isValidForm}
                variant={'outlined'}
                onClick={() => mutate({ draft: true })}
            >
                Save as draft
            </Button>
        );
    };

    const isValidForm = useMemo(() => {
        return formData.isValidForm() && origin?.value && relatedObjects.length > 0;
    }, [formData, origin?.value, relatedObjects]);

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
                customFields={[
                    {
                        Component: OriginLink,
                        order: 3,
                        title: 'Origin',
                        props: {
                            originId: origin,
                            setOriginId: setOrigin,
                            originType: formData.fields.origin?.value,
                        },
                    },
                    {
                        Component: PCSLink,
                        order: 6,
                        title: 'Tag / comm pkg / system',
                        props: {
                            relatedObjects: relatedObjects,
                            setRelatedObjects: setRelatedObjects,
                        },
                    },
                ]}
            >
                {/* <StidSelector /> */}
                {/* <Field label="Attachments" value={<Upload />} /> */}
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

const FormContainer = styled.div``;

function filterElementsByType(items: TypedSelectOption[], type: ProcoSysTypes) {
    return items.filter((x) => x.type === type);
}
