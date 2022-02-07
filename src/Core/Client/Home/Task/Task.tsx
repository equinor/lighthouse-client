import { Typography } from '@equinor/eds-core-react';
import { readAppConfig, useClientContext } from '@equinor/portal-client';
import { useEffect, useState } from 'react';
import { httpClient } from '../../Functions/HttpClient';
import NoTasks from './NoTasks';
import { TaskItem } from './TaskItem';
import { ContentWrapper, Wrapper } from './TaskStyle';
import { ProcosysTasks } from './types';

export const Task = (): JSX.Element => {
    const {
        settings: { userImageUrl, user },
    } = useClientContext();

    const [procosysTasks, setTasks] = useState<ProcosysTasks[]>([]);
    console.log(user);
    useEffect(() => {
        if (user) {
            setTasks((t) =>
                t.length > 0
                    ? t
                    : ([
                          {
                              title: 'This is a link to active test task',
                              url: '#',
                              dueDate: '08/02/2022',
                              assignedTo: {
                                  person: {
                                      name: user.givenName,
                                  },
                              },
                          },
                          {
                              title: 'This is a link to overdue test task',
                              url: '#',
                              dueDate: '01/01/2022',
                              assignedTo: {
                                  person: {
                                      name: user.givenName,
                                  },
                              },
                          },
                      ] as ProcosysTasks[])
            );
        }
    }, [user]);

    useEffect(() => {
        const { scope } = readAppConfig();
        const { customHttpClient } = httpClient({
            scope: scope.fusion,
        });

        async function getTasks(): Promise<ProcosysTasks[] | undefined> {
            try {
                const response = await customHttpClient.get(
                    'https://pro-s-fusiontasks-fprd.azurewebsites.net/persons/me/tasks/procosys'
                );
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
