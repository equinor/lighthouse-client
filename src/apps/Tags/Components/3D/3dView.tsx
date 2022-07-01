import { tokens } from '@equinor/eds-tokens';
import { Viewer } from '@equinor/lighthouse-model-viewer';
import { useFacility } from '@equinor/lighthouse-portal-client';
import styled from 'styled-components';
import { TagOverlay } from '../../../../packages/ModelViewer/components/tagOverlay';
import { Tag } from '../../Types/tag';

export const ThreeDModel = styled.div`
    height: ${() => window.innerHeight - 250 + 'px'};
`;

type ThreeDViewProps = {
    data: Tag;
};

export const statusColorMap = {
    asBuilt: '#007079',
    planned: '#4bb748',
    future: '#52c0ff',
    historic: '#ff7d98',
    outofservice: '#ff9200',
    reserved: '#243746',
    voided: '#eb0000',
    default: '#dcdcdc',
};

export const ThreeDView = ({ data }: ThreeDViewProps): JSX.Element => {
    const { echoPlantId } = useFacility();

    const tagOverlay = {
        [`${data.TagNo}`]: {
            tagNo: data.TagNo,
            status: data.StatusCode.toLocaleLowerCase(),
            type: data.TagFunctionCode,
        },
    };

    return (
        <ThreeDModel>
            <Viewer
                tags={[data.TagNo]}
                echoPlantId={echoPlantId}
                padding={1}
                platformSectionId="Full-Pro"
            >
                <TagOverlay
                    tagOverlay={tagOverlay}
                    titleResolver={({ tagNo, status }) =>
                        `${status.toLocaleUpperCase()} - ${tagNo}`
                    }
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
