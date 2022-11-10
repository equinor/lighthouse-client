import { CircularProgress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { statusColorMap } from '@equinor/GardenUtils';
import { Viewer } from '@equinor/lighthouse-model-viewer';
import { useFacility } from '@equinor/lighthouse-portal-client';
import { useMemo } from 'react';
import styled from 'styled-components';
import { TagMap, TagOverlay } from '../../../../../../packages/ModelViewer/components/tagOverlay';
import { WorkOrderMccr } from '../../../models';

type ThreeDViewProps = {
    mccr: WorkOrderMccr[] | undefined;
    isLoading: boolean;
};
const Center = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const ThreeDModel = styled.div`
    height: ${() => window.innerHeight - 250 + 'px'};
`;

const getTags = (mccr: WorkOrderMccr[] | undefined) => {
    if (mccr === undefined || mccr.length === 0) {
        return undefined;
    }

    const tags = mccr.reduce((acc, curr) => {
        if (curr.tagNumber !== null) {
            acc.push(curr.tagNumber);
        }
        return acc;
    }, [] as string[]);

    if (tags.length === 0) {
        return undefined;
    }

    return tags;
};
export const ThreeDView = ({ isLoading, mccr }: ThreeDViewProps): JSX.Element => {
    const { echoPlantId } = useFacility();
    const tags = useMemo(() => getTags(mccr), [mccr]);
    if (isLoading) {
        return (
            <Center>
                <CircularProgress />
                <div>Fetching tags</div>
            </Center>
        );
    }

    if (!mccr || mccr.length === 0) {
        return (
            <Center>
                <h1>No tags</h1>
            </Center>
        );
    }

    const tagOverlay = mccr.reduce((acc, curr) => {
        if (curr.tagNumber) {
            acc[curr.tagNumber] = {
                tagNo: curr.tagNumber,
                status: curr.mccrStatus || '',
                type: 'UNKNOWN',
            };
        }
        return acc;
    }, {} as TagMap);
    return (
        <ThreeDModel>
            <Viewer tags={tags} echoPlantId={echoPlantId} padding={1} platformSectionId="Full-Pro">
                <TagOverlay
                    tagOverlay={tagOverlay}
                    iconResolver={() => 'tag'}
                    statusResolver={(status) => {
                        return status !== ''
                            ? statusColorMap[status] !== undefined
                                ? statusColorMap[status]
                                : tokens.colors.interactive.primary__resting.rgba
                            : tokens.colors.interactive.primary__resting.rgba;
                    }}
                />
            </Viewer>
        </ThreeDModel>
    );
};
