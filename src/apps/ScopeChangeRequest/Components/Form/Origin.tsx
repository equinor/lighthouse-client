import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { SearchNCR } from './Origins/SearchNCR';
import { SearchDCN } from './Origins/SearchDCN';
import { SearchQuery } from './Origins/SearchQuery';
import { SelectPunch } from './Origins/SelectPunch';
import { OriginType } from '../../Types/scopeChangeRequest';
import { Field } from '../../../../packages/Form/src/Types/field';
import { MultiSelect } from '@equinor/eds-core-react';

interface OriginProps {
    originSource: Field<OriginType> | undefined;
    originId: Field<string | undefined> | undefined;
}

export const Origin = ({ originId, originSource }: OriginProps): JSX.Element => {
    const setOriginId = useCallback(
        (inputOriginId: string | undefined) => {
            if (originSource) {
                originId?.setValue(inputOriginId);
            } else {
                originId?.setValue(undefined);
            }
        },
        [originId, originSource]
    );

    const SelectedComponent = useMemo(() => {
        switch (originSource?.value) {
            case 'NCR':
                return <SearchNCR setOriginId={setOriginId} originId={originId?.value} />;

            case 'DCN':
                return <SearchDCN setOriginId={setOriginId} originId={originId?.value} />;

            case 'Query':
                return <SearchQuery setOriginId={setOriginId} originId={originId?.value} />;

            case 'Punch':
                return <SelectPunch setOriginId={setOriginId} originId={originId?.value} />;

            case 'SWCR':
                return <></>;

            default:
                return (
                    <MultiSelect disabled={true} items={[]} meta="(Required)" label={'Origin ID'} />
                );
        }
    }, [originId?.value, originSource?.value, setOriginId]);

    return <Wrapper>{SelectedComponent}</Wrapper>;
};

const Wrapper = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: -webkit-fill-available;
    padding: 0.14em 0em;
`;
