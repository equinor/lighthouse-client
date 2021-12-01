import { Tag } from '../../../ScopeChangeRequestApp';

interface TagsProps {
    tags?: Tag[];
}

export const Tags = ({ tags }: TagsProps): JSX.Element => {
    return (
        <>
            {tags &&
                tags.map((x) => (
                    <div key={x.id}>
                        <p>{x.name}</p>
                    </div>
                ))}
        </>
    );
};
