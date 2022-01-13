import React from 'react';
import { Wrapper } from '../ScopeChangeRequest/Styles/SidesheetWrapper';
import { PipetestDetailView } from './Components/DetailView/PipetestDetailView';
import { ElectroView } from './Components/Electro/ElectroView';
import { Pipetest } from './Types/Pipetest';


export const CustomSidesheet = (item: Pipetest): JSX.Element => {
    return (
        <>
            {item && !!Object.keys(item).length && (
                <>
                    <Wrapper>
                        <PipetestDetailView pipetest={item} />
                        {item.tagTree !== undefined ? <ElectroView pipetest={item} /> : null}
                    </Wrapper>
                </>
            )}
        </>
    );
};
