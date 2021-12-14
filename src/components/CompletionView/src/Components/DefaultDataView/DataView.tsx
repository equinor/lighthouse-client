import { useEffect, useState } from 'react';
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
        <>
            {dataViewSideSheetOptions?.CustomRender ? (
                <dataViewSideSheetOptions.CustomRender item={selectedData} onClose={handleClose} />
            ) : (
                <DefaultDataView
                    viewOptions={viewOptions}
                    selectedData={selectedData}
                    onClose={handleClose}
                    data={data}
                />
            )}
        </>
    );
}
