import { IDataCreationProvider } from '@equinor/lighthouse-fusion-modules';
import { createContext, PropsWithChildren, useContext } from 'react';

const DataCreatorContext = createContext({ getCreators: () => [] as any } as IDataCreationProvider);

export const DataCreatorProvider = ({
    children,
    dataCreator,
}: PropsWithChildren<{ dataCreator: IDataCreationProvider }>): JSX.Element => {
    return (
        <DataCreatorContext.Provider value={dataCreator}>{children}</DataCreatorContext.Provider>
    );
};

export function useDataCreatorContext(): IDataCreationProvider {
    return useContext(DataCreatorContext);
}
