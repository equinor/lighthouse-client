import { FrappeGantt, Task, ViewMode } from "frappe-gantt-react";
const tasks = [
    new Task({
        id: 'D1',
        name: '1220-43543',
        start: '2021-1-28',
        end: '2021-1-31',
        progress: 100,
        dependencies: '',
        custom_class: 'bar-milestone'
    }),
    new Task({
        id: 'D2',
        name: '1235-4351',
        start: '2021-2-2',
        end: '2021-2-31',
        progress: 69,
        dependencies: 'D1',
        custom_class: 'bar-milestone'
    }),
    new Task({
        id: 'D3',
        name: '6576-2342',
        start: '2021-3-5',
        end: '2021-3-31',
        progress: 10,
        dependencies: 'D2',
        custom_class: 'bar-milestone'
    }),
    new Task({
        id: 'D4',
        name: '3453-64563',
        start: '2021-4-1',
        end: '2021-4-31',
        progress: 0,
        dependencies: 'D4, D3',
        custom_class: 'bar-milestone'
    })
]


export const TimelineTab = () => {


    return (
        <FrappeGantt
            tasks={tasks}
            viewMode={ViewMode.Month}
            onClick={task => console.log(task)}
            onDateChange={(task, start, end) => console.log(task, start, end)}
            onProgressChange={(task, progress) => console.log(task, progress)}
            onTasksChange={tasks => console.log(tasks)}
        />
    );
}