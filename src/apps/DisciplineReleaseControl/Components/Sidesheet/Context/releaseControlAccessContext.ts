import React from 'react';
import { OptionRequestResult } from '../../../Api/Access/optionsRequestChecker';
import { ServerError } from '../../../Api/Types/ServerError';
import { DisciplineReleaseControl } from '../../../Types/disciplineReleaseControl';


export interface ReleaseControlContextState {
    process: DisciplineReleaseControl;
    requestAccess: OptionRequestResult;
    setErrorMessage: (value: ServerError) => void;
    isRefetching: boolean;
}

export const ReleaseControlContext = React.createContext({} as ReleaseControlContextState);
