import { Checkbox } from '@equinor/eds-core-react';
import { ResultLabel, ResultItem } from './advancedSearch.styles';
import { useState } from 'react';
import { TypedSelectOption } from '../PersonRoleSearch/typedSelectOption';

interface ResultProps {
    result: TypedSelectOption;
    handleClick: (result: TypedSelectOption, action: 'Add' | 'Remove') => void;
    isSelected: (x: TypedSelectOption) => boolean;
}

export const Result = ({ result, handleClick, isSelected }: ResultProps): JSX.Element => {
    const [isChecked, setIsChecked] = useState(isSelected(result));

    return (
        <>
            <ResultItem key={result.value}>
                <Checkbox
                    checked={isChecked}
                    onChange={() => {
                        handleClick(result, isChecked ? 'Remove' : 'Add');
                        setIsChecked((prev) => !prev);
                    }}
                />
                <ResultLabel>{result.label}</ResultLabel>
            </ResultItem>
        </>
    );
};
