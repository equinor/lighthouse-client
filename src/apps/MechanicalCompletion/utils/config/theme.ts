import { CommissioningStatus } from '../../types';

export const commStatusColors: Record<CommissioningStatus, string> = {
    'RFOC Accepted': '#0035bc',
    'RFOC Sent': '#09ccf2',
    'RFOC Rejected': '#eb0000',
    'TAC Accepted': '#e77422',
    'TAC Sent': '#edb882',
    'TAC Rejected': '#eb0000',
    'RFCC Accepted': '#7cb342',
    'RFCC Sent': '#c5e1a5',
    'RFCC Rejected': '#eb0000',
    'Punch status accepted': '#006964',
    'Contractor final punch': '#a8ced1',
    OS: '#d9eaf2',
};

export const itemContentColors: Record<'Light' | 'Dark', string> = {
    Light: '#111111',
    Dark: '#ffffff',
};
