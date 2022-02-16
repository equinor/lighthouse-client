import styled from 'styled-components';
import { SectionRow } from '../Styles/Section';
import { CustomField, Field } from '../Types/field';
import { Form } from '../Types/form';
import { groupBy } from '../Utils/groupBy';
import { Field as VisualField } from './Field';
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
    customFields?: CustomField[];
    children?: React.ReactNode;
}

export const GeneratedForm = <T, K extends keyof T>({
    formData,
    customFields,
    editMode,
    buttons,
    title,
    behaviour,
    children,
}: FormProps<T>): JSX.Element => {
    const fields: (Field<T[K]> | CustomField)[] = [];

    Object.keys(formData.fields).map((fieldKey) => {
        const field = formData.fields[fieldKey as K];
        if (field) {
            fields.push(field);
        }
    });
    customFields && customFields.forEach((x) => fields.push(x));

    fields.sort((a, b) => a.order - b.order);
    const grouped = groupBy(fields, 'order');

    const groupedFields = Array.from(grouped.values());

    return (
        <>
            <h2>{title}</h2>
            {groupedFields.map((fieldArray, index) => {
                return (
                    <SectionRow key={fieldArray.toString() + index.toString()}>
                        {fieldArray.map((field: Field<T[K] | CustomField>, index: number) => {
                            if (isCustomComponent(field)) {
                                const { Component, props, title } = field as unknown as CustomField;
                                return (
                                    <VisualField
                                        key={title + index}
                                        label={title}
                                        value={<Component {...props} />}
                                    />
                                );
                            }

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
            {children}

            <div style={{ height: '2em' }} />
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

const isCustomComponent = (arg: CustomField | unknown): arg is CustomField => {
    return (arg as CustomField).Component !== undefined;
};
