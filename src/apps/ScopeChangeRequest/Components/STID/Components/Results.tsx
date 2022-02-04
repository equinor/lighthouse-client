import { Icon } from '@equinor/eds-core-react';
import { Result, IconContainer, ResultLabel } from './stidSelectorStyles';
import { TypedSelectOption } from '../../../Api/Search/searchType';

interface ResultsProps {
    results: TypedSelectOption[];
    handleClick: (x: TypedSelectOption) => void;
}

export const Results = ({ results, handleClick }: ResultsProps): JSX.Element => {
    return (
        <>
            {results &&
                results.map((x) => {
                    return (
                        <Result key={x.value}>
                            <IconContainer>
                                <Icon name={x.type === 'stidtag' ? 'tag' : 'file_copy'} />
                            </IconContainer>
                            <ResultLabel>{x.label}</ResultLabel>
                            <IconContainer>
                                <Icon
                                    name={x.type === 'stidtag' ? 'arrow_forward' : 'add'}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        handleClick(x);
                                    }}
                                />
                            </IconContainer>
                        </Result>
                    );
                })}
        </>
    );
};
