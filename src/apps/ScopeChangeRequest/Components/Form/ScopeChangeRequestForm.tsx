import { Button, Progress, SingleSelect, TextField } from '@equinor/eds-core-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { ClickableIcon } from '../../../../components/Icon/ClickableIcon';
import { spawnConfirmationDialog } from '../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { clearActiveFactory } from '../../../../Core/DataFactory/Functions/clearActiveFactory';
import { openSidesheet } from '../../../../packages/Sidesheet/Functions';
import { getCategories } from '../../Api/ScopeChange/Form/getCategories';
import { getPhases } from '../../Api/ScopeChange/Form/getPhases';
import {
    getScopeChangeById,
    patchScopeChange,
    postScopeChange,
    uploadAttachment,
} from '../../Api/ScopeChange/Request';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { CacheTime } from '../../Enums/cacheTimes';
import { scopeChangeMutationKeys } from '../../Keys/scopeChangeMutationKeys';
import { scopeChangeQueryKeys } from '../../Keys/scopeChangeQueryKeys';
import { ProcoSysTypes } from '../../Types/ProCoSys/ProCoSysTypes';
import { ScopeChangeRequest, ScopeChangeRequestFormModel } from '../../Types/scopeChangeRequest';
import { StidTypes } from '../../Types/STID/STIDTypes';
import { Upload } from '../Attachments/Upload';
import { RelatedObjectsSearch } from '../SearchableDropdown/RelatedObjectsSearch/RelatedObjectsSearch';
import { ScopeChangeSideSheet } from '../Sidesheet/ScopeChangeSidesheet';
import { Origin } from './Origin';

const REQUIRED_META = '(Required)';

interface ScopeChangeRequestFormProps {
    closeScrim: () => void;
    scopeChangeId?: string;
    request?: ScopeChangeRequest;
}

export const ScopeChangeRequestForm = ({
    closeScrim,
    scopeChangeId: initialId,
    request,
}: ScopeChangeRequestFormProps): JSX.Element | null => {
    const { register, handleSubmit, setError, getValues, control, watch } =
        useForm<ScopeChangeRequest>({ defaultValues: { title: request?.title ?? '' } });

    const [scopeChangeId, setScopeChangeId] = useState<string | undefined>(initialId);

    const originSource = watch('originSource');

    const queryClient = useQueryClient();

    const onCreated = async (scopeChangeId: string) => {
        if (!scopeChangeId) return;

        openSidesheet(ScopeChangeSideSheet, await getScopeChangeById(scopeChangeId));
        clearActiveFactory();
        queryClient.invalidateQueries();
    };

    const saveDraft = () => {
        if (getValues('title')) {
            onSave(getValues());
        } else {
            setError(
                'title',
                { message: 'Title is required to make a draft' },
                { shouldFocus: true }
            );
        }
    };

    const resolveRelatedObjects = (data: ScopeChangeRequest): ScopeChangeRequestFormModel => ({
        ...data,
        tagNumbers: filterElementsByType(relatedObjects, 'tag').map((x) => x.value),
        areaCodes: filterElementsByType(relatedObjects, 'area').map((x) => x.value),
        disciplineCodes: filterElementsByType(relatedObjects, 'discipline').map((x) => x.value),
        systemIds: filterElementsByType(relatedObjects, 'system').map((x) => Number(x.value)),
        documentNumbers: filterElementsByType(relatedObjects, 'document').map((x) => x.value),
        commissioningPackageNumbers: filterElementsByType(relatedObjects, 'commpkg').map(
            (x) => x.value
        ),
    });

    const handleCreate = async (data: ScopeChangeRequest, draft: boolean): Promise<void> => {
        const request = resolveRelatedObjects(data);

        const id = await createScopeChangeAsync({ draft: draft, scopeChange: request });
        if (id) {
            const { baseKey } = scopeChangeQueryKeys(id);
            //upload attachments
            attachments.forEach(async (attachment) => {
                await uploadAttachmentAsync({ file: attachment, requestId: id })
                    .then(() => queryClient.invalidateQueries(baseKey))
                    .catch(() =>
                        spawnConfirmationDialog(
                            "We're terribly sorry",
                            'Some attachments failed to upload',
                            () => void 0
                        )
                    );
            });

            onCreated(id);
        }
    };

    const onSave = async (data: ScopeChangeRequest) => {
        if (scopeChangeId) {
            await patchScopeChangeAsync({ request: resolveRelatedObjects(data), setAsOpen: false });
        } else {
            await handleCreate(data, true);
        }
    };

    const onSubmit = async (data: ScopeChangeRequest) => {
        if (scopeChangeId) {
            await patchScopeChangeAsync({ request: resolveRelatedObjects(data), setAsOpen: true });
        } else {
            await handleCreate(data, false);
        }
    };

    const { mutateAsync: uploadAttachmentAsync } = useMutation(uploadAttachment, {
        retry: 2,
        retryDelay: 2,
    });

    const {
        mutateAsync: createScopeChangeAsync,
        isLoading,
        failureCount,
    } = useMutation(['ScopeChange'], postScopeChange, {
        retryDelay: 1000,
    });

    const { baseKey } = scopeChangeMutationKeys(scopeChangeId ?? '');
    const { mutateAsync: patchScopeChangeAsync } = useMutation(baseKey, patchScopeChange, {
        retryDelay: 1000,
    });

    const { data: phases } = useQuery(['phases'], getPhases, {
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.TenHours,
    });
    const { data: categories } = useQuery(['categories'], getCategories, {
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.TenHours,
    });

    const [relatedObjects, setRelatedObjects] = useState<TypedSelectOption[]>([]);
    const [attachments, setAttachments] = useState<File[]>([]);
    const origins = ['NCR', 'DCN', 'Query', 'Punch', 'SWCR', 'NotApplicable'];

    const originSourceIdKey: keyof ScopeChangeRequest = 'originSourceId';

    return (
        <>
            <Header>
                <Title>Create scope change request</Title>{' '}
                <ClickableIcon name="close" onClick={closeScrim} />
            </Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    id="title"
                    label="Title"
                    meta={REQUIRED_META}
                    {...register('title', { required: true })}
                />

                <Controller<ScopeChangeRequest>
                    control={control}
                    name={'phase'}
                    render={({ field: { onChange, value, ref } }) => (
                        <SingleSelect
                            items={phases ?? []}
                            ref={ref}
                            value={value}
                            handleSelectedItemChange={(ev) => onChange(ev.selectedItem ?? '')}
                            label={'Phase'}
                            meta={REQUIRED_META}
                        />
                    )}
                />

                <Inline>
                    <Controller<ScopeChangeRequest>
                        control={control}
                        name={'category'}
                        render={({ field: { onChange, value, ref } }) => (
                            <SingleSelect
                                items={categories ?? []}
                                ref={ref}
                                value={value}
                                handleSelectedItemChange={(ev) => onChange(ev.selectedItem ?? '')}
                                label={'Change category'}
                                meta={REQUIRED_META}
                            />
                        )}
                    />
                    <Controller<ScopeChangeRequest>
                        control={control}
                        name={'originSource'}
                        render={({ field: { onChange, value, ref } }) => (
                            <SingleSelect
                                items={origins ?? []}
                                ref={ref}
                                value={value}
                                handleSelectedItemChange={(ev) => onChange(ev.selectedItem ?? '')}
                                label={'Change origin'}
                                meta={REQUIRED_META}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name={originSourceIdKey}
                        render={({ field: { onChange, value } }) => (
                            <Origin
                                originSource={originSource}
                                originId={value}
                                setOriginId={onChange}
                            />
                        )}
                    />
                </Inline>
                <TextField
                    id="desc"
                    multiline
                    label="Scope description"
                    meta={REQUIRED_META}
                    {...register('description', { required: true })}
                />
                <Inline style={{ gridTemplateColumns: '1fr 2fr' }}>
                    <TextField
                        {...register('guesstimateHours', { required: true })}
                        id={'Guess direct Mhrs'}
                        label={'Guess direct Mhrs'}
                        meta={REQUIRED_META}
                        type={'number'}
                    />
                    <TextField
                        id="Guesstimate description"
                        label="Guesstimate description"
                        {...register('guesstimateDescription')}
                    />
                </Inline>

                <RelatedObjectsSearch
                    relatedObjects={relatedObjects}
                    setRelatedObjects={setRelatedObjects}
                />

                <span>
                    <BoldHeader>Attachments</BoldHeader>
                    <Upload attachments={attachments} setAttachments={setAttachments}></Upload>
                </span>

                <ButtonContainer>
                    {isLoading ? (
                        <Progress.Dots
                            size={48}
                            color={failureCount > 0 ? 'tertiary' : 'primary'}
                        />
                    ) : (
                        <>
                            <Button onClick={saveDraft}>Save</Button>
                            <Button onClick={() => console.log({ ...getValues() })}>
                                get form values
                            </Button>
                            <Button type="submit">Submit</Button>
                        </>
                    )}
                </ButtonContainer>
            </Form>
        </>
    );
};

function filterElementsByType(items: TypedSelectOption[], type: ProcoSysTypes | StidTypes) {
    return items.filter((x) => x.type === type);
}

const Title = styled.h2`
    font-size: 28px;
    line-height: 35px;
    font-weight: 400;
`;

const Header = styled.div`
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const BoldHeader = styled.h5`
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
`;

const Inline = styled.div`
    display: grid;
    gap: 1em;
    grid-auto-columns: minmax(0, 1fr);
    grid-auto-flow: column;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

const ButtonContainer = styled.span`
    display: flex;
    flex-direction: row;
    gap: 1em;
    justify-content: flex-end;
`;
