import { Progress } from '@equinor/eds-core-react';
import { useMutation } from 'react-query';
import { Row } from 'react-table';
import { StyledButton } from './exportToExcel.styles';

type ExportToExcelProps = {
    excelExportFn: (filteredRows: Row<{}>[]) => Promise<void>;
    rows: Row<{}>[];
    width?: string;
};
export const ExportToExcel = ({ excelExportFn, rows, width }: ExportToExcelProps) => {
    const { mutate, isLoading } = useMutation(
        excelExportFn,

        {
            retry: 0,
        }
    );

    return (
        <StyledButton
            disabled={isLoading}
            onClick={() => {
                mutate(rows);
            }}
            width={width}
        >
            {isLoading ? <Progress.Dots /> : 'Export to Excel'}
        </StyledButton>
    );
};
