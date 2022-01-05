import styled from 'styled-components';
import { SectionRow } from '../Styles/Section';
import { Field } from '../Types/field';
import { Form } from '../Types/form';
import { groupBy } from '../Utils/groupBy';
import { GeneratedField } from './GeneratedField';

export interface Behaviour {
    hideDisabledFields?: boolean;
    hideMetaTags?: boolean;
}

interface FormProps<T> {
    formData: Form<T>;
    editMode: boolean;
    buttons: React.FC[];
    title?: string;
    behaviour?: Behaviour;
}

export const GeneratedForm = <T, K extends keyof T>({
    formData,
    editMode,
    buttons,
    title,
    behaviour,
}: FormProps<T>): JSX.Element => {
    const fields: Field<T[K]>[] = [];

    Object.keys(formData.fields).map((fieldKey) => {
        const field = formData.fields[fieldKey as K];
        if (field) {
            fields.push(field);
        }
    });

    fields.sort((a, b) => a.order - b.order);
    const grouped = groupBy(fields, 'order');

    const groupedFields = Array.from(grouped.values());

    return (
        <>
            <h2>{title}</h2>
            {groupedFields.map((fieldArray, index) => {
                return (
                    <SectionRow key={fieldArray.toString() + index.toString()}>
                        {fieldArray.map((field: Field<T[K]>, index: number) => {
                            return (
                                <GeneratedField<T>
                                    key={field.toString() + index.toString()}
                                    editMode={editMode}
                                    field={field as unknown as Field<T>}
                                    behaviour={behaviour}
                                />
                            );
                        })}
                    </SectionRow>
                );
            })}
            <ButtonContainer>
                {buttons &&
                    buttons.map((Component, index) => {
                        return (
                            <div key={index} style={{ margin: '0.2em' }}>
                                <Component />
                            </div>
                        );
                    })}
            </ButtonContainer>
        </>
    );
};

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
