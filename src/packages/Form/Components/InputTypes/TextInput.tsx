import { Value } from '../../Types/value';
import { Input } from '@equinor/eds-core-react';

interface TextInputProps {
    setter: (value: string) => Promise<void>;
    field: Value<string>;
    editMode: boolean;
    CustomComponent?: React.FC<{
        setter: (value: string) => Promise<void>;
        field: Value<string>;
        editMode: boolean;
    }>;
}

export const TextInput = ({
    setter,
    field,
    editMode,
    CustomComponent,
}: TextInputProps): JSX.Element => {
    return (
        <>
            {CustomComponent ? (
                <CustomComponent setter={setter} field={field} editMode={editMode} />
            ) : (
                <Input
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
