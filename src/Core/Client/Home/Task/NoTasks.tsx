import { tokens } from '@equinor/eds-tokens';
import { FunctionComponent } from 'react';
import Icon from '../../../../components/Icon/Icon';
import { Typography, Wrapper } from './NoTasksStyle';

interface NoTasksProps { }

const NoTasks: FunctionComponent<NoTasksProps> = () => {
    return (
        <Wrapper>
            <Icon
                name="check_circle_outlined"
                size={40}
                color={tokens.colors.interactive.primary__hover_alt.rgba}
            />
            <Typography>You don´t have any active tasks</Typography>;
        </Wrapper>
    );
};

export default NoTasks;
