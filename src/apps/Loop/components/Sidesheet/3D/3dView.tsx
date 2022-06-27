import { tokens } from '@equinor/eds-tokens';
import { Viewer } from '@equinor/lighthouse-model-viewer';
import { useFacility } from '@equinor/lighthouse-portal-client';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { TagMap, TagOverlay } from '../../../../../packages/ModelViewer/components/tagOverlay';
import { Loop } from '../../../types';
import { getLoopContent } from '../../../utility/api';
import { generateExpressions, generateFamRequest } from '../../../utility/helpers/fam';
export const ThreeDModel = styled.div`
    height: ${() => window.innerHeight - 250 + 'px'};
`;
type ThreeDViewProps = {
    loop: Loop;
};
const columnNames = ['LoopNo', 'ContentTagNo', 'MechanicalCompletionStatus', 'Register'];
export const ThreeDView = ({ loop }: ThreeDViewProps) => {
    const { echoPlantId } = useFacility();
    const expressions = generateExpressions('loopNo', 'Equals', [loop.loopNo]);
    const requestArgs = generateFamRequest(columnNames, 'Or', expressions);
    const { data, isLoading } = useQuery(['loopcontent', loop.loopNo], ({ signal }) =>
        getLoopContent(requestArgs, signal)
    );
    const tags = useMemo(() => data?.map((a) => a.contentTagNo), [data]);
    if (!data) {
        return <h2>Loading</h2>;
    }
    if (isLoading) {
        return <h2>Loading</h2>;
    }
    const newData = data.reduce((acc, curr) => {
        acc[curr.contentTagNo] = {
            tagNo: curr.contentTagNo,
            status: curr.mechanicalCompletionStatus || '',
            type: curr.register || '',
        };
        return acc;
    }, {} as TagMap);

    return (
        <ThreeDModel>
            <Viewer tags={tags} echoPlantId={echoPlantId} padding={1} platformSectionId="Full-Pro">
                <TagOverlay
                    tagOverlay={newData}
                    iconResolver={() => 'tag'}
                    statusResolver={() => tokens.colors.interactive.primary__resting.rgba}
                />
            </Viewer>
        </ThreeDModel>
    );
};
