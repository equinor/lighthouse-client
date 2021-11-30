import { Button } from '@equinor/eds-core-react';
import { useState } from 'react';
import styled from 'styled-components';
import { DataViewer } from '../../components/CompletionView/src/Components/DataViewer';
import { DataProvider } from '../../components/CompletionView/src/Context/DataProvider';
import { createDataViewer } from '../../components/CompletionView/src/DataViewerApi/DataViewerApi';
//import { Title } from '../../styles/header';
import { AppApi } from '../apps';
import { ScopeChangeForm } from './Components/ScopeChangeForm';
import { mockRequests } from './Data/MockData';
import { Stats } from './Components/Stats';

export interface Tag {
    id: string;
    name: string;
    description: string;
}

export interface Document {
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
    documents?: Document[];
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
        groupeKey: 'state',
        itemKey: 'id',
        //groupByKeys: ['phase'],
        excludeKeys: [],
    });

    request.registerTreeOptions({
        groupByKeys: ['origin', 'id'],
        rootNode: 'state',
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
            <Header>
                <Title>Scope change control</Title>
                <Stats />
            </Header>
            {showForm ? (
                <ScopeChangeForm visible={setShowForm} />
            ) : (
                <>
                    <ButtonContainer>
                        <Button variant={'outlined'} onClick={handleClick}>
                            + New change request
                        </Button>
                    </ButtonContainer>
                    <DataProvider>
                        <DataViewer {...props} />
                    </DataProvider>
                </>
            )}
        </div>
    );
};

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Title = styled.h1`
    opacity: 0.7;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1.5em;
`;
