import { tokens } from '@equinor/eds-tokens';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDataContext } from '../../Context/DataProvider';
import { DefaultDataView } from './DefaultView';

export function DataView(): JSX.Element {
    const { data, item, viewOptions, dataViewSideSheetOptions } = useDataContext();

    const [selectedData, setSelectedData] = useState<any>(undefined);

    const handleClose = () => {
        setSelectedData(undefined);
    };

    useEffect(() => {
        setSelectedData(item);
    }, [item]);

    return (
        <Wrapper>
            {dataViewSideSheetOptions?.CustomComponent ? (
                <dataViewSideSheetOptions.CustomComponent
                    item={selectedData}
                    onClose={handleClose}
                />
            ) : (
                <DefaultDataView
                    viewOptions={viewOptions}
                    selectedData={selectedData}
                    onClose={handleClose}
                    data={data}
                />
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    border-left: 2px solid ${tokens.colors.ui.background__medium.rgba};
`;
