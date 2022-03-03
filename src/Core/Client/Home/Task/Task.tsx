import { Typography } from '@equinor/eds-core-react';
import { useClientContext } from '@equinor/portal-client';
import { useEffect, useState } from 'react';
import { httpClient } from '../../Functions/HttpClient';
import { getDummyTask } from './dummyTask';
import NoTasks from './NoTasks';
import { TaskItem } from './TaskItem';
import { ContentWrapper, Wrapper } from './TaskStyle';
import { ProcosysTasks } from './types';

export const Task = (): JSX.Element => {
    const {
        settings: { userImageUrl, user, clientEnv },
    } = useClientContext();

    const [procosysTasks, setTasks] = useState<ProcosysTasks[]>([]);

    useEffect(() => {
        if (user) {
            setTasks((t) => (t.length > 0 ? t : getDummyTask(clientEnv, user)));
        }
    }, [clientEnv, user]);

    useEffect(() => {
        const { fusionTasks } = httpClient();

        async function getTasks(): Promise<ProcosysTasks[] | undefined> {
            try {
                const response = await fusionTasks.get('persons/me/tasks/procosys');
                return await response.json();
            } catch (error) {
                console.error('Fails to get tasks: ', error);
            }
        }

        getTasks().then((data) => {
            if (data && data.length > 0) setTasks(data);
        });
    }, []);

    return (
        <Wrapper>
            <Typography variant="h5">Tasks</Typography>
            <ContentWrapper>
                {procosysTasks.length > 0 ? (
                    procosysTasks
                        .sort((a, b) => {
                            if (new Date(a.dueDate).getTime() >= new Date(b.dueDate).getTime())
                                return 1;
                            else return -1;
                        })
                        .map((item) => (
                            <TaskItem key={item.id} {...item} userImageUrl={userImageUrl} />
                        ))
                ) : (
                    <NoTasks />
                )}
            </ContentWrapper>
        </Wrapper>
    );
};
