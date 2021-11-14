
import { Cognite3DViewer } from '@cognite/reveal';
import { CogniteClient } from '@cognite/sdk';
import React, { Dispatch, useEffect, useReducer } from 'react';
import { ThreeDInstance } from '../Api/threeD';
import { actions, Actions } from './3DActions';
import ThreeDReducer from './3DReducer';
import { initialThreeDState, ThreeDState } from './3DState';


export type ClientInstance = CogniteClient
export type ViewerInstance = Cognite3DViewer

interface ThreeDContextProviderProps {
    children: React.ReactNode;
    threeDInstance?: ThreeDInstance;
}

export interface ThreeDContextState extends ThreeDState {
    dispatch: Dispatch<Actions>;
}

export const ThreeDContext = React.createContext<ThreeDContextState>({} as ThreeDContextState);

export const ThreeDContextProvider: React.FunctionComponent<ThreeDContextProviderProps> = ({
    children,
    threeDInstance
}: ThreeDContextProviderProps): JSX.Element => {



    const [state, dispatch] = useReducer(ThreeDReducer, { ...initialThreeDState } as ThreeDState);

    useEffect(() => {
        if (threeDInstance)
            dispatch(actions.setThreeDInstance(threeDInstance))
    }, [threeDInstance])

    return (
        <ThreeDContext.Provider
            value={{
                ...state,
                dispatch
            }}
        >
            {children}
        </ThreeDContext.Provider>
    );

};
