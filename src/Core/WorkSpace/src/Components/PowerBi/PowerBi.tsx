import { PowerBI } from '@equinor/lighthouse-powerbi';
import { useDataContext } from '../../Context/DataProvider';

export const PowerBiTab = (): JSX.Element | null => {
    const { powerBiOptions } = useDataContext();

    if (powerBiOptions) {
        return (
            <PowerBI
                reportUri={powerBiOptions?.reportURI}
                filterOptions={powerBiOptions.filter}
                options={powerBiOptions.options}
            />
        );
    }
    return null;
};
