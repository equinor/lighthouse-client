export type MessageType = 'Error' | 'NoPlant' | 'NoTags' | 'Default';

export interface Message {
    type: MessageType;
    message: string;
}
