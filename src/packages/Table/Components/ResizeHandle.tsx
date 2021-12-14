import { ReactElement } from 'react';
import { ResizeHandleComponent } from './Styles';


export const ResizeHandle = ({
    column,
}: {
    column
}): ReactElement => {
    return (
        <ResizeHandleComponent handleActive={column.isResizing} {...column.getResizerProps()} />
    );
};
