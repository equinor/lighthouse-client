export interface ServiceMessage {
    id: string;
    message?: string;
    toDate: string;
    fromDate: string;
    link?: Link;
    type?: 'info' | 'warning' | 'default';
}


export interface Link {
    url: string;
    title: string;
};