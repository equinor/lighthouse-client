type StatusNumber = '1' | '2' | '3' | '4';
type StatusString = 'OS' | 'PA' | 'PB' | 'OK';
const rcStatusColorMap: Record<StatusString, string> = {
  OS: '#9e9e9e',
  PA: '#ff4081',
  PB: '#ffc107',
  OK: '#00c853',
};

const rcStatusMap: Record<StatusNumber, string> = {
  1: 'OS',
  2: 'PA',
  3: 'PB',
  4: 'OK',
};

export const getMccrStatusColorByStatus = (mccrStatus: number): string => {
  return rcStatusColorMap[mccrStatus];
};

export const getMccrStatusByNumber = (mccrStatus: number): string => {
  return rcStatusMap[mccrStatus];
};
