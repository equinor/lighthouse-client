import { CircularProgress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Viewer } from '@equinor/lighthouse-model-viewer';
import { useFacility } from '@equinor/lighthouse-portal-client';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { statusColorMap } from '../../../../../packages/GardenUtils/src';
import { TagMap, TagOverlay } from '../../../../../packages/ModelViewer/components/tagOverlay';
import { Loop } from '../../../types';
import { getLoopContent } from '../../../utility/api';
import { generateExpressions, generateFamRequest } from '../../../utility/helpers/fam';
export const ThreeDModel = styled.div`
    height: ${() => window.innerHeight - 250 + 'px'};
`;

const Center = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

type ThreeDViewProps = {
    loop: Loop;
};
const columnNames = ['LoopNo', 'ContentTagNo', 'MechanicalCompletionStatus', 'Register'];
export const ThreeDView = ({ loop }: ThreeDViewProps) => {
    const { echoPlantId } = useFacility();
    const expressions = generateExpressions('loopNo', 'Equals', [loop.tagNo]);
    const requestArgs = generateFamRequest(columnNames, 'Or', expressions);
    const { data, isLoading } = useQuery(['loopcontent', loop.tagNo], ({ signal }) =>
        getLoopContent(requestArgs, signal)
    );
    const tags = useMemo(() => data?.map((a) => a.contentTagNo), [data]);

    if (isLoading) {
        return (
            <Center>
                <CircularProgress />
                <div>Fetching loop content</div>
            </Center>
        );
    }

    if (!data || data.length === 0) {
        return (
            <Center>
                <h1>No loop content</h1>
            </Center>
        );
    }
    const tagOverlay = data.reduce((acc, curr) => {
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
                    tagOverlay={tagOverlay}
                    iconResolver={() => 'tag'}
                    statusResolver={(status) =>
                        status !== ''
                            ? statusColorMap[status]
                            : tokens.colors.interactive.primary__resting.rgba
                    }
                />
            </Viewer>
        </ThreeDModel>
    );
};
