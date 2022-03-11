import { Button, NativeSelect, SingleSelect, TextField } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ClickableIcon } from '../../../../components/Icon/ClickableIcon';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { Upload } from '../Attachments/Upload';

const REQUIRED_META = '(Required)';

export const HookForm = (): JSX.Element | null => {
    const { register, handleSubmit } = useForm<ScopeChangeRequest>();
    const onSubmit = (data: ScopeChangeRequest) => console.log(data);

    const [relatedObjects, setRelatedObjects] = useState<TypedSelectOption[]>([]);
    const [attachments, setAttachments] = useState<File[]>([]);

    return (
        <>
            <Header>
                <Title>Create scope change request</Title> <ClickableIcon name="close" />
            </Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    id="title"
                    label="Title"
                    meta={REQUIRED_META}
                    {...register('title', { required: true })}
                />
                <NativeSelect
                    id="phase"
                    label="Phase"
                    meta={REQUIRED_META}
                    {...register('phase', { required: true })}
                >
                    <option>IC phase</option>
                </NativeSelect>
                <Inline>
                    <NativeSelect
                        label="Change category"
                        meta={REQUIRED_META}
                        id="category"
                        {...register('category', { required: true })}
                    >
                        <option>Hidden carryover</option>
                    </NativeSelect>
                    <NativeSelect
                        label="Change origin"
                        meta={REQUIRED_META}
                        id="origin"
                        {...register('originSource', { required: true })}
                    >
                        <option>NCR</option>
                    </NativeSelect>
                    <SingleSelect
                        inputMode="text"
                        items={[]}
                        label="Origin ID"
                        meta={REQUIRED_META}
                        id="origin id"
                        {...register('originSourceId')}
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
                        {...register('guesstimateDescription', { required: true })}
                    />
                </Inline>

                <BoldHeader>References</BoldHeader>

                <BoldHeader>Attachments</BoldHeader>
                <Upload
                    attachments={[]}
                    setAttachments={function (value: SetStateAction<File[]>): void {
                        throw new Error('Function not implemented.');
                    }}
                ></Upload>

                <ButtonContainer>
                    <Button type="reset" color="danger" variant="outlined">
                        Cancel
                    </Button>
                    <Button type="submit">Submit</Button>
                </ButtonContainer>
            </Form>
        </>
    );
};

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
