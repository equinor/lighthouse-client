import { Attachment } from '@microsoft/microsoft-graph-types';

interface AttachmentsProps {
    attachments?: Attachment[];
}

export const Attachments = ({ attachments }: AttachmentsProps): JSX.Element => {
    return (
        <>
            {attachments &&
                attachments.map((x) => (
                    <div key={x.id}>
                        <p>{x.name}</p>
                    </div>
                ))}
        </>
    );
};
