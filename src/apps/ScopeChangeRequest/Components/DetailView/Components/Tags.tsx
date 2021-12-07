import { Tag } from '../../../Types/tag';

interface TagsProps {
    tags?: Tag[];
}

export const Tags = ({ tags }: TagsProps): JSX.Element => {
    return (
        <>
            {tags &&
                tags.map((x) => (
                    <div key={x.id}>
                        <div>
                            {x.name} - {x.description}
                        </div>
                    </div>
                ))}
        </>
    );
};
