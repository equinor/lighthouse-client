import React from 'react';
import { Input } from '@equinor/eds-core-react';

import { Value } from '../../Types/value';

interface TextAreaProps {
    setter: (value: string) => Promise<void>;
    field: Value<string>;
    editMode: boolean;
    CustomComponent?: React.FC<{
        setter: (value: string) => Promise<void>;
        field: Value<string>;
        editMode: boolean;
    }>;
}

export const TextArea = ({
    setter,
    field,
    editMode,
    CustomComponent,
}: TextAreaProps): JSX.Element => {
    return (
        <>
            {CustomComponent ? (
                <CustomComponent setter={setter} field={field} editMode={editMode} />
            ) : (
                <Input
                    height={'20em'}
                    width={'20em'}
                    style={{ marginBottom: '0.2em' }}
                    disabled={editMode ? !field?.editable : false}
                    placeholder={`Enter ${field.label}`}
                    defaultValue={field?.value}
                    type="string"
                    onChange={(e) => {
                        if (!e.target.value) {
                            setter('');
                        }
                        e.target.value && setter(e.target.value);
                    }}
                />
            )}
        </>
    );
};
