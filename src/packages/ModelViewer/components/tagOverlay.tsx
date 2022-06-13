import { useMemo } from 'react';
import { Icon } from '../../Components/Icon';
import { useOverlay } from '../hooks/useOverlay';
import TagIcon from './TagIcon';
import TagIconShadowWrapper from './TagIconShadow';

export type TagMap = Record<
    string,
    {
        tagNo: string;
        status: string;
        type: string;
    }
>;
interface TagOverlayProps {
    tagOverlay: TagMap;
    iconResolver: (type: string) => string;
    statusResolver: (status: string) => string;
}

export const TagOverlay = ({
    tagOverlay,
    iconResolver,
    statusResolver,
}: TagOverlayProps): JSX.Element => {
    const filter = useMemo(() => Object.values(tagOverlay).map((t) => t.tagNo), [tagOverlay]);
    const tags = useOverlay().filter((tag) => (filter ? filter.includes(tag.tagNo) : true));

    return (
        <div style={{ position: 'absolute' }}>
            {tags.map((t, i) => (
                <div
                    key={`${t.tagNo}_${i}`}
                    title={tagOverlay[t.tagNo].tagNo}
                    style={{
                        ...t.domPosition,
                        width: '28px',
                        height: '28px',
                        position: 'absolute',
                    }}
                >
                    <TagIconShadowWrapper>
                        <TagIcon
                            icon={
                                <Icon
                                    name={iconResolver(tagOverlay[t.tagNo].type)}
                                    color={'#ffffff'}
                                />
                            }
                            legendColor={statusResolver(tagOverlay[t.tagNo].status)}
                        />
                    </TagIconShadowWrapper>
                </div>
            ))}
        </div>
    );
};
