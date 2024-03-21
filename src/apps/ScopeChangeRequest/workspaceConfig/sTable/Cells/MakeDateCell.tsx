import { DateTime } from 'luxon';

interface MakeDateCellProps {
  date: string | null;
}
export function MakeDateCell({ date }: MakeDateCellProps) {
  return (
    <>
      {date &&
        DateTime.fromJSDate(new Date(date)).toRelative({
          locale: 'en-GB',
        })}
    </>
  );
}
