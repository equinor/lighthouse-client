import { Button } from '@equinor/eds-core-react';

import { createDataViewer } from '../../components/CompletionView/src/DataViewerApi/DataViewerApi';
import { AppApi } from '../apps';
import { mockRequests } from './Data/MockData';
import { Wrapper } from '../../components/CompletionView/src/Components/DefaultDataView/DataView.styles';
import { RequestSideSheet } from './Components/RequestSideSheet';
import { ScopeChangeRequest } from './Types/scopeChangeRequest';

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
        return mockRequests();
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

    request.registerTableOptions({
        objectIdentifierKey: 'id',
    });

    request.registerGardenOptions({ groupeKey: 'origin', itemKey: 'id', excludeKeys: [] });

    request.registerAnalyticsOptions({});

    interface CustomViewFunctionProps<T> {
        item: T;
        onClose: () => void;
    }

    const CustomViewFunction = ({ item, onClose }: CustomViewFunctionProps<ScopeChangeRequest>) => {
        return (
            <>
                {item && !!Object.keys(item).length && (
                    <>
                        <Wrapper>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button onClick={() => onClose()}>X</Button>
                            </div>
                            <RequestSideSheet close={onClose} request={item} />
                        </Wrapper>
                    </>
                )}
            </>
        );
    };

    request.registerDataViewSideSheetOptions({
        CustomRender: CustomViewFunction,
    });
}
