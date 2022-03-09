/* The Client context is dependent on a clientState,
 *  and updates to the context is made trough the state.
 */

import { Atom, DeepImmutable, deref, swap, useAtom } from '@dbeining/react-atom';
import { GlobalClientState } from '../Types/GlobalClientState';

/* Initial Global state used for setting panel states and logging sate to false */
const INITIAL_STATE = {
    settings: {
        appsPanelActive: false,
        fullscreenMenuActive: false,
        logging: false,
        isProduction: false,
        clientEnv: 'dev',
    },
    context: {
        project: {
            projectId: 'jca',
        },
        facilityId: 'jca',
        procosysPlantId: 'PCS$JOHAN_CASTBERG',
        fusionContextId: '65728fee-185d-4a0c-a91d-8e3f3781dad8',
        sapPlantId: '1930',
        echoPlantId: 'jca',
        title: 'Johan Castberg',
        fusionContext: {
            id: '65728fee-185d-4a0c-a91d-8e3f3781dad8',
            externalId: 'JCA',
            type: {
                id: '',
                isChildType: false,
                parentTypeIds: [] as string[],
            },
            value: {
                identity: 'JCA',
                sapPlant: '1930',
                schema: 'PCS$JOHAN_CASTBERG',
                subFacilities: [] as string[],
            },
            title: 'Johan Castberg',
            isActive: true,
            isDeleted: false,
            created: '2020-02-27T07:58:11.6966667+00:00',
            updated: '2020-07-16T21:00:08.391739+00:00',
        },
    },
} as GlobalClientState;

/** @type {Atom<GlobalClientState>}  Main State in Application*/
const GLOBAL_CLIENT_STATE = createGlobalClientState(INITIAL_STATE);

function createGlobalClientState(initialState: GlobalClientState) {
    return Atom.of(initialState);
}

/**
 * Internal function used for globalClientActions.
 * @return {Atom<GlobalClientState>}
 */
function getGlobalClientState(): Atom<GlobalClientState> {
    return GLOBAL_CLIENT_STATE;
}

/**
 * Internal hook used retrieving the globalClientState.
 * @return {DeepImmutable<GlobalClientState>}
 */
export function useGlobalClientState(): DeepImmutable<GlobalClientState> {
    return useAtom(getGlobalClientState());
}

/**
 * Internal function used manipulating the globalClientState.
 */
export function updateGlobalClientState(
    update: (state: GlobalClientState) => Partial<GlobalClientState>
): void {
    swap(getGlobalClientState(), (currentState) => ({ ...currentState, ...update(currentState) }));
}

/**
 * Internal function used retrieving the globalClientState.
 * @param {(state: GlobalClientState) => S} read
 * @return {GlobalClientState}  returns GlobalClientState or a specified par of the state.
 */
export function readGlobalClientState<S>(
    read: (state: GlobalClientState) => Readonly<S>
): Readonly<S> {
    const state = deref<GlobalClientState>(getGlobalClientState());
    return read(state);
}
