import { SingleSelect } from '@equinor/eds-core-react';
import { Control, Controller, Path } from 'react-hook-form';

interface ControllerSingleSelectProps<T> {
    // eslint-disable-next-line @typescript-eslint/ban-types
    control: Control<T, object>;
    label: string;
    fieldName: keyof T;
    selectOptions: string[];
    isRequired?: boolean;
}

const REQUIRED_META = '(Required)';
export function ControllerSingleSelect<T>({
    control,
    label,
    fieldName,
    selectOptions,
    isRequired,
}: ControllerSingleSelectProps<T>): JSX.Element {
    return (
        <Controller
            control={control}
            name={fieldName as unknown as Path<T>}
            rules={{ required: isRequired }}
            render={({ field: { onChange, value, ref } }) => (
                <>
                    <SingleSelect
                        items={selectOptions}
                        ref={ref}
                        value={value as unknown as string}
                        handleSelectedItemChange={(ev) => onChange(ev.selectedItem ?? '')}
                        label={label}
                        meta={isRequired ? REQUIRED_META : undefined}
                    />
                </>
            )}
        />
    );
}
