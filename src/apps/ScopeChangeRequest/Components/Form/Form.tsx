import { Button, Progress, TextField } from '@equinor/eds-core-react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getCategories } from '../../Api/ScopeChange/Form/getCategories';
import { getPhases } from '../../Api/ScopeChange/Form/getPhases';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { CacheTime } from '../../Enums/cacheTimes';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { RelatedObjectsSearch } from '../SearchableDropdown/RelatedObjectsSearch/RelatedObjectsSearch';
import { ControllerSingleSelect } from './ControllerSingleSelect';
import { Origin } from './Origin';

interface ScopeChangeFormProps {
    // eslint-disable-next-line @typescript-eslint/ban-types
    formHandler: UseFormReturn<ScopeChangeRequest, object>;
    onSubmit: (data: ScopeChangeRequest) => Promise<void>;
    onSave: (data: ScopeChangeRequest) => Promise<void>;
    isMutating: boolean;
    relatedObjects: {
        setRelatedObjects: React.Dispatch<React.SetStateAction<TypedSelectOption[]>>;
        relatedObjects: TypedSelectOption[];
    };
    children?: React.ReactChild;
}

const REQUIRED_META = '(Required)';
const ORIGINS = ['NCR', 'DCN', 'Query', 'Punch', 'SWCR', 'NotApplicable'];

export function ScopeChangeForm({
    formHandler: { handleSubmit, control, register, watch, getValues },
    onSave,
    onSubmit,
    isMutating,
    relatedObjects: { setRelatedObjects, relatedObjects },
    children,
}: ScopeChangeFormProps): JSX.Element {
    const { data: phases } = useQuery(['phases'], getPhases, {
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    });

    const { data: categories } = useQuery(['categories'], getCategories, {
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    });

    const originSource = watch('originSource');

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    id="title"
                    label="Title"
                    meta={REQUIRED_META}
                    {...register('title', { required: true })}
                />

                <ControllerSingleSelect
                    control={control}
                    label={'Phase'}
                    fieldName={'phase'}
                    selectOptions={phases ?? []}
                    isRequired={true}
                />

                <Inline>
                    <ControllerSingleSelect
                        control={control}
                        label={'Change category'}
                        fieldName={'category'}
                        selectOptions={categories ?? []}
                        isRequired={true}
                    />

                    <ControllerSingleSelect
                        control={control}
                        label={'Origin source'}
                        selectOptions={ORIGINS}
                        fieldName={'originSource'}
                        isRequired={true}
                    />

                    <Controller
                        control={control}
                        name={'originSourceId'}
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

                {children}
                {isMutating ? (
                    <Progress.Linear color="primary" />
                ) : (
                    <ButtonContainer>
                        <Button
                            disabled={getValues().title?.length < 1}
                            onClick={() => onSave(getValues())}
                        >
                            Save
                        </Button>
                        <Button type="submit">Submit</Button>
                    </ButtonContainer>
                )}
            </Form>
        </>
    );
}

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
