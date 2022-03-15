import { useMemo } from 'react';
import styled from 'styled-components';
import { SearchOrigin } from './Origins/SearchOrigin';
import { SelectPunch } from './Origins/SelectPunch';
import { SelectSWCR } from './Origins/SelectSWCR';
import { MultiSelect } from '@equinor/eds-core-react';

interface OriginProps {
    originSource: string | undefined;
    originId: string | null | undefined;
    setOriginId: (value: string | undefined) => void;
}

export const Origin = ({ setOriginId, originSource, originId }: OriginProps): JSX.Element => {
    const SelectedComponent = useMemo(() => {
        switch (originSource) {
            case 'NCR':
                return <SearchOrigin setOriginId={setOriginId} originId={originId} type={'NCR'} />;

            case 'DCN':
                return <SearchOrigin setOriginId={setOriginId} originId={originId} type={'DCN'} />;

            case 'Query':
                return (
                    <SearchOrigin setOriginId={setOriginId} originId={originId} type={'Query'} />
                );

            case 'Punch':
                return <SelectPunch setOriginId={setOriginId} originId={originId} />;

            case 'SWCR':
                return <SelectSWCR setOriginId={setOriginId} originId={originId} />;
            default:
                return (
                    <MultiSelect disabled={true} items={[]} meta="(Required)" label={'Origin ID'} />
                );
        }
    }, [originId, originSource, setOriginId]);

    return <Wrapper>{SelectedComponent}</Wrapper>;
};

const Wrapper = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: -webkit-fill-available;
    padding: 0.14em 0em;
`;
