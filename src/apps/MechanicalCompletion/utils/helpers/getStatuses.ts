import { CommissioningStatus, McPackage } from '../../types';

export const getCommissioningStatus = (mcPackage: McPackage): CommissioningStatus => {
  if (mcPackage.rfocIsAccepted) {
    return 'RFOC Accepted';
  } else if (mcPackage.rfocIsRejected) {
    return 'RFOC Rejected';
  } else if (mcPackage.rfocIsShipped) {
    return 'RFOC Sent';
  } else if (mcPackage.tacIsAccepted) {
    return 'TAC Accepted';
  } else if (mcPackage.tacIsShipped) {
    return 'TAC Sent';
  } else if (mcPackage.rfccIsAccepted) {
    return 'RFCC Accepted';
  } else if (mcPackage.rfccIsRejected) {
    return 'RFCC Rejected';
  } else if (mcPackage.rfccIsShipped) {
    return 'RFCC Sent';
  } else if (mcPackage.punchAcceptActualDate) {
    return 'Punch status accepted';
  } else if (mcPackage.finalPunchActualDate) {
    return 'Contractor final punch';
  }
  return 'OS';
};
