export interface ServiceMessage {
    id: string;
    message?: string;
    toDate: string;
    fromDate: string;
    link?: {
        url: string;
        title: string;
    };
    type?: 'info' | 'warning' | 'default';
}
