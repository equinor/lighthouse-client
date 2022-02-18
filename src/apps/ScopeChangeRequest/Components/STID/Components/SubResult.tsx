import { Icon } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { TypedSelectOption } from '../../../Api/Search/searchType';
import { SubResult } from './AdvancedDocumentSearch';
import { ResultLabel, IconContainer, Title, ResultItem } from './advancedSearchStyles';

interface SubResultsProps {
    subResults: SubResult | undefined;
    handleReturnClick: () => void;
    handleClick: (x: TypedSelectOption, action: 'Add' | 'Remove') => void;
}

export const SubResults = ({
    subResults,
    handleClick,
    handleReturnClick,
}: SubResultsProps): JSX.Element => {
    return (
        <>
            {subResults && (
                <div>
                    <Header>
                        <IconContainer>
                            <Icon name="arrow_back" onClick={handleReturnClick} />
                        </IconContainer>
                        <Title>{subResults.tagName}</Title>
                        <span></span>
                    </Header>
                    {subResults.documents.length > 0 && (
                        <div>
                            <br />
                            {subResults.documents.map((x) => {
                                return (
                                    <>
                                        <ResultItem key={x.value}>
                                            <IconContainer>
                                                <Icon name="file_copy" />
                                            </IconContainer>
                                            <ResultLabel>{x.label}</ResultLabel>
                                            <IconContainer>
                                                <Icon
                                                    name="add"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        handleClick(x, 'Add');
                                                    }}
                                                />
                                            </IconContainer>
                                        </ResultItem>
                                    </>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
