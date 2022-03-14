import { MultiSelect as Select } from '@equinor/eds-core-react';

import { Field } from '../Types/field';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import Icon from '../../../../components/Icon/Icon';


interface DateProps<T> {
    field: Field<T>;
    editMode: boolean;

}

export function Date<T>({ field, editMode, }: DateProps<T>): JSX.Element {


    if (typeof field.value === 'string' || typeof field.value === 'undefined') {
        return (
            <DateContainer>
                <DateInput
                    id={field.toString()}
                    disabled={editMode ? !field?.editable : false}
                    type="date"
                    value={field.value}
                    placeholder={field.placeholderText}
                    onChange={(e) => {
                        if (!e.target.value || e.target.value.length < 1) {
                            field.setValue(undefined as unknown as T);
                        } else {
                            field.setValue(e.target.value as unknown as T);
                        }
                    }}

                />
                <Icon name="calendar_date_range" />
            </DateContainer>
        );
    }
    return <p style={{ color: 'red' }}>{field} is not of type string | date or undefined</p>;
}

const DateContainer = styled.div`
    width: 100%;
    position: relative;
    cursor: pointer;

    > svg {
        position: absolute;
        top: 8px;
        right: 0px;
        pointer-events: none;
        fill: ${tokens.colors.interactive.primary__resting.rgba};
    }
`;


const DateInput = styled.input`
    width: 100%;
    font-family: Equinor;
    font-size: 1.000rem;
    font-weight: 400;
    line-height: 1.500em;
    background:  ${tokens.colors.ui.background__light.rgba};
    border: none;
    box-shadow: inset 0px -1px 0px 0px  ${tokens.colors.text.static_icons__tertiary.rgba};
    letter-spacing: 0.025em;
    text-align: left;
    padding-left: 8px;
    padding-top: 6px;
    padding-bottom: 6px;
    color: ${tokens.colors.text.static_icons__tertiary.rgba};
    cursor: pointer;
    :focus{
        outline-offset: 0;
        box-shadow: none;
        outline: 2px solid var(--eds_interactive_primary__resting,rgba(0,112,121,1));
        outline-offset: 0px
    }

    ::-webkit-calendar-picker-indicator {
        opacity:0;
        margin-left:5px;
        cursor: pointer;
    }
`

