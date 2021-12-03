import { Button } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { Form } from '../Types/form';
import { GeneratedField } from './GeneratedField';
import { useFormValidation } from '../Hooks/useFormValidation';
import { Value } from '../Types/value';

interface Events {
    onCancel: () => void;
    onSubmit: () => void;
}

interface Behaviour {
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
    console.log(behaviour?.hideDisabledFields);
    return (
        <>
            <h1>{title}</h1>

            {Object.keys(formData.fields).map((key: string) => {
                const field: Value<string> = formData.fields[key];
                if (behaviour?.hideDisabledFields && !field.editable) {
                    return <></>;
                }
                return (
                    field && (
                        <GeneratedField
                            key={field.label}
                            inputType={field.inputType}
                            setter={formData.getSetter(field)}
                            field={field}
                            editMode={editMode}
                            customComponents={customComponents}
                        />
                    )
                );
            })}
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
