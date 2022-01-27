import { useCallback, useEffect, useMemo, useState } from 'react';
import { SingleSelect } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { SearchNCR } from './Origins/SearchNCR';
import { SearchDCN } from './Origins/SearchDCN';
import { SearchQuery } from './Origins/SearchQuery';
import { SelectPunch } from './Origins/SelectPunch';
import { OriginType, Origin as OriginInterface } from '../../Types/scopeChangeRequest';

interface OriginProps {
    setOrigin: React.Dispatch<React.SetStateAction<OriginInterface | undefined>>;
}

export const Origin = ({ setOrigin }: OriginProps): JSX.Element => {
    const [originType, setOriginType] = useState<OriginType | undefined>();

    const setOriginId = useCallback(
        (originId: string | undefined) => {
            if (originType) {
                setOrigin({ type: originType, id: originId });
            } else {
                setOrigin(undefined);
            }
        },
        [originType, setOrigin]
    );

    useEffect(() => {
        setOriginId(undefined);
    }, [originType, setOriginId]);

    const SelectedComponent = useMemo(() => {
        setOrigin(undefined);
        switch (originType) {
            case 'NCR':
                return <SearchNCR setOriginId={setOriginId} />;

            case 'DCN':
                return <SearchDCN setOriginId={setOriginId} />;

            case 'Query':
                return <SearchQuery setOriginId={setOriginId} />;

            case 'Punch':
                return <SelectPunch setOriginId={setOriginId} />;

            case 'SWCR':
                return <></>;

            default:
                return <></>;
        }
    }, [originType, setOrigin, setOriginId]);

    return (
        <Wrapper>
            <SingleSelect
                label=""
                items={['NCR', 'DCN', 'Query', 'Punch', 'NotApplicable']}
                handleSelectedItemChange={(e) => setOriginType(e.selectedItem as OriginType)}
            />
            <div style={{ width: '50px' }}></div>
            {SelectedComponent}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: -webkit-fill-available;
`;
