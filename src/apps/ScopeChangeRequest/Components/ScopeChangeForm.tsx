import { Button, Input, SingleSelect } from '@equinor/eds-core-react';
import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Value } from '../../../hooks/Form/useFormSchema';
import { useFormValidation } from '../../../hooks/Form/useFormValidation';
import useScopeChangeSchema from './ScopeChangeForm/Hooks/useScopeChangeSchema';

interface ScopeChangeFormProps {
    visible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ScopeChangeForm: FC<ScopeChangeFormProps> = ({
    visible,
}: ScopeChangeFormProps): JSX.Element => {
    const formData = useScopeChangeSchema();
    const { isValidForm } = useFormValidation(formData);

    const getCategories = (): string[] => {
        return ['Hidden carryover', 'Design change'];
    };
    const getOrigins = (): string[] => {
        return ['NCR', 'Punch', 'SWCR'];
    };
    const getResponsibles = (): string[] => {
        return ['I', 'need', 'examples'];
    };

    useEffect(() => {
        console.log('Form is valid', isValidForm);
        // console.log('FormData is all dirty', formData.isAllDirty(true));
        // console.log('FormData is all valid', formData.isAllValid());
        // console.log('Get changed data', formData.getChangedData());
    }, [formData.fields, isValidForm]);

    function resetField(field: Value<string> | undefined) {
        formData.getSetter(field)('');
    }

    return (
        <>
            <ButtonContainer>
                <Button onClick={() => visible(false)}>x</Button>
            </ButtonContainer>

            <FormContainer>
                <h2>Create new scope change request </h2>
                <Input
                    style={{ backgroundColor: 'transparent', marginBottom: '2em', border: 'none' }}
                    placeholder={'Enter change request title'}
                    type="string"
                    onChange={(e) => {
                        if (!e.target.value) {
                            resetField(formData.fields.title);
                        }
                        e.target.value && formData.getSetter(formData.fields.title)(e.target.value);
                    }}
                />
                <SelectRow>
                    <p>Responsible</p>
                    <SingleSelect
                        items={getResponsibles()}
                        label={''}
                        placeholder={'Select responsible'}
                        handleSelectedItemChange={(select) => {
                            if (!select.selectedItem) {
                                resetField(formData.fields.responsible);
                            }
                            select.selectedItem &&
                                formData.getSetter(formData.fields.responsible)(
                                    select.selectedItem
                                );
                        }}
                    />
                    <p>Change origin</p>
                    <SingleSelect
                        items={getOrigins()}
                        label={''}
                        placeholder={'Select origin'}
                        handleSelectedItemChange={(select) => {
                            if (!select.selectedItem) {
                                resetField(formData.fields.origin);
                            }
                            select.selectedItem &&
                                formData.getSetter(formData.fields.origin)(select.selectedItem);
                        }}
                    />
                    <p>Change category</p>
                    <SingleSelect
                        items={getCategories()}
                        label={''}
                        placeholder={'Select category'}
                        handleSelectedItemChange={(select) => {
                            if (!select.selectedItem) {
                                resetField(formData.fields.category);
                            }
                            select.selectedItem &&
                                formData.getSetter(formData.fields.category)(select.selectedItem);
                        }}
                    />
                </SelectRow>
                <Container>
                    <InputSection>
                        <Input
                            width={'20em'}
                            height={'10em'}
                            placeholder={'Click to add description'}
                            type="string"
                            onChange={(e) => {
                                if (!e.target.value) {
                                    resetField(formData.fields.description);
                                }
                                e.target.value &&
                                    formData.getSetter(formData.fields.description)(e.target.value);
                            }}
                        />
                        <Input
                            placeholder={'Click to add comment'}
                            type="string"
                            onChange={(e) => {
                                e.target.value &&
                                    formData.getSetter(formData.fields.comments)([e.target.value]);
                            }}
                        />
                    </InputSection>
                    <LinkedInfoSection>
                        <p>Tag</p>
                        <Button>+ Add tag</Button>
                        <p>Documents</p>
                        <Button>+ Add document</Button>
                        <p>Attachments</p>
                        <Button>+ Add attachment</Button>
                    </LinkedInfoSection>
                    <WorkflowSection>
                        <p>Submit by originator</p>
                        <Dot />
                        <p>Review by engineering</p>
                        <Dot />
                        <p>Approve by integrated construction</p>
                        <Dot />
                        <p>Close out by engineering </p>
                        <Dot />
                    </WorkflowSection>
                </Container>
            </FormContainer>
            <ButtonContainer>
                <Button
                    color={'primary'}
                    onClick={() => {
                        console.log('Form is valid', isValidForm);
                        if (isValidForm) {
                            visible(false);
                        }
                    }}
                >
                    Create
                </Button>
                <Button color={'danger'} onClick={() => visible(false)}>
                    Cancel
                </Button>
            </ButtonContainer>
        </>
    );
};

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 5em;
`;

const SelectRow = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #d5ebf3;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
`;

const InputSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 5em;
`;

const WorkflowSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 5em;
`;

const LinkedInfoSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 2em;
`;

export const Dot = styled.span`
    height: 1rem;
    width: 1rem;
    background-color: #0584c2;
    border-radius: 50%;
`;
