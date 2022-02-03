import { useEffect } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { SplitView } from './Components/RequestDetailView/Double';
import { SingleView } from './Components/RequestDetailView/Single';

export const RequestDetailView = (): JSX.Element => {
    const biggerThan650 = useMediaPredicate('(min-width: 650px)');

    useEffect(() => {
        console.log(biggerThan650);
    }, [biggerThan650]);

    return <>{biggerThan650 ? <SplitView /> : <SingleView />}</>;
};

/**
 //TODO:
 * Do some CSS magic, Calculate height of DetailViewContainer and subtract RequestActionsContainer to make overflow work properly
 */
