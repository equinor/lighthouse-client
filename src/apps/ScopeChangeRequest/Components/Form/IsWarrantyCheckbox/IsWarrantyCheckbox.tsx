import { Checkbox } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';

interface IsWarrantyCaseCheckboxProps {
    initialValue?: boolean;
    handleInput: (val: boolean) => void;
}

export const IsWarrantyCaseCheckbox = ({
    initialValue,
    handleInput,
}: IsWarrantyCaseCheckboxProps): JSX.Element => {
    const [isChecked, setIsChecked] = useState(Boolean(initialValue));

    useEffect(() => {
        handleInput(Boolean(initialValue));
    }, []);

    return (
        <div>
            <Checkbox
                onChange={() => {
                    handleInput(!isChecked);
                    setIsChecked((old) => !old);
                }}
                checked={isChecked}
                label="Potential warranty case"
            />
        </div>
    );
};
