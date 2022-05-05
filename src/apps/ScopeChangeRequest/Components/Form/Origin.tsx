import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { SearchOrigin } from '../Inputs/Origins/SearchOrigin';
import { SelectPunch } from '../Inputs/Origins/SelectPunch';
import { SelectSWCR } from '../Inputs/Origins/SelectSWCR';
import { MultiSelect } from '@equinor/eds-core-react';
import { FormTextField } from '../Inputs/FormTextField';

interface OriginSourceParams {
    originSource: string | undefined;
    handleOriginSourceChange: (value: string | undefined) => void;
}

interface OriginIdParams {
    originId: string | undefined;
    handleOriginIdChange: (value: string | undefined) => void;
}
interface OriginProps {
    originSource: OriginSourceParams;
    originId: OriginIdParams;
}

export const Origin = ({ originId, originSource }: OriginProps): JSX.Element => {
    const setOriginId = useCallback(
        (inputOriginId: string | undefined) => {
            if (originSource) {
                originId.handleOriginIdChange(inputOriginId);
            } else {
                originId.handleOriginIdChange(undefined);
            }
        },
        [originId, originSource]
    );

    const SelectedComponent = useMemo(() => {
        switch (originSource?.originSource) {
            case 'NCR':
                return (
                    <SearchOrigin
                        setOriginId={setOriginId}
                        originId={originId?.originId}
                        type={'NCR'}
                    />
                );

            case 'DCN':
                return (
                    <SearchOrigin
                        setOriginId={setOriginId}
                        originId={originId?.originId}
                        type={'DCN'}
                    />
                );

            case 'DCR': {
                return (
                    <FormTextField
                        initialValue={originId?.originId}
                        onChange={(e) => setOriginId(e)}
                        placeholder="Enter DCR number"
                    />
                );
            }

            case 'Query':
                return (
                    <SearchOrigin
                        setOriginId={setOriginId}
                        originId={originId?.originId}
                        type={'Query'}
                    />
                );

            case 'Punch':
                return <SelectPunch setOriginId={setOriginId} originId={originId?.originId} />;

            case 'SWCR':
                return <SelectSWCR setOriginId={setOriginId} originId={originId?.originId} />;
            default:
                return (
                    <MultiSelect disabled={true} items={[]} meta="(Required)" label={'Origin ID'} />
                );
        }
    }, [originId?.originId, originSource?.originSource, setOriginId]);

    return <Wrapper>{SelectedComponent}</Wrapper>;
};

const Wrapper = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0.14em 0em;
`;
