import { PowerBI } from '../../../../modules/powerBI';
import { useDataContext } from '../Context/DataProvider';

export const PowerBiTab = () => {
    const { powerBiOptions } = useDataContext();

    if (powerBiOptions) {
        return (
            <PowerBI
                reportUri={powerBiOptions?.reportId}
                filterOptions={powerBiOptions.filterOptions}
            />
        );
    }
    return null;
};
