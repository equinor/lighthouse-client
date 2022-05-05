import { CommissioningStatus } from '../../types';
import { itemContentColors } from '../config/theme';

export const getItemContentsColor = (status: CommissioningStatus) => {
    return status === 'RFOC Accepted' || status === 'Punch status accepted'
        ? itemContentColors.Dark
        : itemContentColors.Light;
};
