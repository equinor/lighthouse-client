import { useOverlay } from '../hooks/useOverlay';

export const TagOverlay = (): JSX.Element => {
    const tags = useOverlay();

    return (
        <div style={{ position: 'absolute' }}>
            {tags.map((t) => (
                <div
                    key={t.key}
                    style={{
                        ...t.domPosition,
                        width: '28px',
                        height: '28px',
                        background: 'red',
                        position: 'absolute',
                    }}
                ></div>
            ))}
        </div>
    );
};
