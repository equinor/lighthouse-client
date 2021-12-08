import { Button } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { Form } from '../Types/form';
import { GeneratedField } from './GeneratedField';
import { useFormValidation } from '../Hooks/useFormValidation';
import { Value } from '../Types/value';
import { SectionRow } from '../Styles/Section';

interface Events {
    onCancel: () => void;
    onSubmit: () => void;
}

export interface Behaviour {
    hideDisabledFields?: (() => boolean) | boolean;
}

export interface Components {
    customTextInput?: React.FC;
    customNumberInput?: React.FC;
    customMultiSelect?: React.FC;
    customSingleSelect?: React.FC;
}

interface FormProps<T> {
    formData: Form<T>;
    editMode: boolean;
    events: Events;
    title?: string;
    behaviour?: Behaviour;
    customComponents?: Components;
}
export function GeneratedForm<T>({
    formData,
    editMode,
    events: { onCancel, onSubmit },
    title,
    customComponents,
    behaviour,
}: FormProps<T>): JSX.Element {
    const { isValidForm } = useFormValidation(formData, editMode);
    const allItems: Value<unknown>[][] = [];
    const ids = new Set();
    const fields: Value<unknown>[] = [];

    Object.keys(formData.fields).map((fieldName) => {
        ids.add(formData.fields[fieldName]['order']);
        fields.push(formData.fields[fieldName]);
    });

    ids.forEach((id) => {
        allItems.push(fields.filter((x) => x['order'] == id));
    });

    return (
        <>
            <h1>{title}</h1>

            <>
                {allItems.map((fieldArray) => {
                    return (
                        <SectionRow key={fieldArray.map((x) => x.label).toString()}>
                            {fieldArray.map((field) => {
                                if (behaviour?.hideDisabledFields && !field.editable && editMode) {
                                    return <></>;
                                }
                                return (
                                    <>
                                        <GeneratedField
                                            field={field as Value<any>}
                                            key={field.order}
                                            inputType={field.inputType}
                                            setter={formData.getSetter(field)}
                                            editMode={editMode}
                                            customComponents={customComponents}
                                        />
                                    </>
                                );
                            })}
                        </SectionRow>
                    );
                })}
            </>

            <ButtonContainer>
                <Button onClick={onCancel} variant={'outlined'} color={'danger'}>
                    Cancel
                </Button>
                <HorizontalSpacer />
                <Button onClick={onSubmit} type={'submit'} disabled={!isValidForm}>
                    {editMode ? 'Save' : 'Submit'}
                </Button>
            </ButtonContainer>
        </>
    );
}

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 5em;
    align-items: center;
`;
const HorizontalSpacer = styled.div`
    margin-right: 0.2em;
    margin-left: 0.2em;
`;
