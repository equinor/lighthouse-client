import { Checkbox } from '@equinor/eds-core-react';
import { ResultLabel, ResultItem } from './advancedSearchStyles';
import { TypedSelectOption } from '../../../Api/Search/searchType';
import { useState } from 'react';
import { ExtendedTypedSelectOption } from './AdvancedDocumentSearch';
import { IconMenu } from '../../MenuButton';

interface ResultProps {
    result: ExtendedTypedSelectOption;
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
                {result.actions && <IconMenu items={result.actions} />}
            </ResultItem>
        </>
    );
};
