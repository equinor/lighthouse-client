import styled from 'styled-components';
import { Form } from '../Types/form';
import { GeneratedField } from './GeneratedField';
import { Value } from '../Types/value';
import { SectionRow } from '../Styles/Section';
import React from 'react';

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
    title?: string;
    behaviour?: Behaviour;
    customComponents?: Components;
    buttons?: React.FC[];
}
export function GeneratedForm<T>({
    formData,
    editMode,
    title,
    customComponents,
    behaviour,
    buttons,
}: FormProps<T>): JSX.Element {
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
            {title && <h1>{title}</h1>}

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
}

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
