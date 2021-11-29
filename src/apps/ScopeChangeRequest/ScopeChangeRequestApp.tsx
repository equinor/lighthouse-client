import { Button } from '@equinor/eds-core-react';
import { useState } from 'react';
import { DataViewer } from '../../components/CompletionView/src/Components/DataViewer';
import { DataProvider } from '../../components/CompletionView/src/Context/DataProvider';
import { createDataViewer } from '../../components/CompletionView/src/DataViewerApi/DataViewerApi';
import { AppApi } from '../apps';
import { ScopeChangeForm } from './Components/ScopeChangeForm';
import { mockRequests } from './Data/MockData';

export interface Tag {
    id: string;
    name: string;
    description: string;
}

export interface ScopeChangeRequest {
    id: string;
    title: string;
    description: string;
    created: string;
    state: 'Closed' | 'Open';
    phase: string;
    milestone: string;
    origin: string;
    category: string;
    guesstimateHrs: string;
    actualHrs: string;
    responsible: string;
    tags?: Tag[];
    documents?: Tag[];
    comments?: string[];
    //workflow
}

export function setup(appApi: AppApi): void {
    // const api = baseClient(appApi.authProvider, [appApi.appConfig.procosys]);
    const request = createDataViewer<ScopeChangeRequest>({
        initialState: [],
        primaryViewKey: 'id',
        viewerId: appApi.shortName,
    });

    request.registerDataFetcher(async () => {
        // const plantId = 'PCS$JOHAN_CASTBERG';
        // const project = 'L.O532C.002';
        // const response = await api
        //     .fetch
        //     // `https://api-lighthouse-production.playground.radix.equinor.com/loops/${plantId}/${project}`
        //     ();
        //return JSON.parse(await response.text());
        const a = mockRequests();
        return a;
    });

    request.registerFilterOptions({
        typeMap: {},
    });

    request.registerViewOptions({
        objectIdentifierKey: 'id',
        title: {
            key: 'id',
            label: 'Request id',
        },
    });

    request.registerTableOptions({ objectIdentifierKey: 'id' });
    request.registerGardenOptions({
        gardenKey: 'state',
        itemKey: 'id',
        //groupByKeys: ['phase'],
        excludeKeys: [],
    });

    // request.registerAnalyticsOptions({});
    // request.registerTreeOptions({
    //     groupByKeys: ['Id', 'Phase'],
    //     rootNode: 'Id',
    // });
}

export const ScopeChangeRequestApp = (props) => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const handleClick = () => {
        setShowForm(true);
    };

    return (
        <div>
            {showForm ? (
                <ScopeChangeForm visible={setShowForm} />
            ) : (
                <>
                    <Button onClick={handleClick} color={'primary'}>
                        + New change request
                    </Button>
                    <DataProvider>
                        <DataViewer {...props} />
                    </DataProvider>
                </>
            )}
        </div>
    );
};
