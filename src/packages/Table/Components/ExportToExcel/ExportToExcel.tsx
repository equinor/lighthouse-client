import { Button, Progress } from '@equinor/eds-core-react';
import { useMutation } from 'react-query';
import { Row } from 'react-table';

type ExportToExcelProps = {
    excelExportFn: (filteredRows: Row<{}>[]) => Promise<void>;
    rows: Row<{}>[];
    width?: string;
};
export const ExportToExcel = ({ excelExportFn, rows, width }: ExportToExcelProps) => {
    const { mutate, isLoading } = useMutation(excelExportFn);

    return (
        <Button
            disabled={isLoading}
            onClick={() => {
                mutate(rows);
            }}
            style={{ width: width || '150px' }}
        >
            {isLoading ? <Progress.Dots /> : 'Export to Excel'}
        </Button>
    );
};
