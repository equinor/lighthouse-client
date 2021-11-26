import { FrappeGantt, Task, ViewMode } from "frappe-gantt-react";
import { useEffect, useState } from "react";
import { useFilteredData } from "../../../Filter";

interface GnatTask {
    id: string;
    name: string;
    start: string;
    end: string;
    progress: number;
    custom_class?: string;
    dependencies: string;
}

interface GnatTaskMapper<T> {
    id: keyof T;
    name: keyof T;
    start: keyof T;
    end: keyof T;
    progress: (i: T) => number;
    custom_class?: keyof T;
    dependencies?: keyof T;
}

const toString = (data) => (`${data}`)
const toDataString = (data) => {
    const year = new Date(data).getFullYear()
    const month = new Date(data).getMonth()
    const day = new Date(data).getDay()
    return `${day}-${month}-${year}`

}

function createGnatData<T>(data: T[], mapper: GnatTaskMapper<T>): Task[] {
    return data.reduce((tasks, taskItem: T) => {
        const task = new Task({
            id: toString(taskItem[mapper.id]),
            name: toString(taskItem[mapper.name]),
            start: toDataString(taskItem[mapper.start]),
            end: toDataString(taskItem[mapper.end]),
            custom_class: mapper.custom_class && toString(taskItem[mapper.custom_class])
        })
        if (mapper.dependencies) {
            const dependencies = taskItem[mapper.dependencies];
            typeof dependencies === "string" && task.setDependencies([dependencies])
            Array.isArray(dependencies) && task.setDependencies(dependencies)
        }
        if (task.start && task.end)
            tasks.push(task)
        return tasks
    }, [] as Task[])
}

interface Checklist {
    Area__Id: string;
    CommPhase__Id: string;
    CommPkgNo: string;
    CommPriority1__Id: string;
    CommPriority2__Id: string;
    CommPriority3__Id: string;
    CommissioningHandoverStatus: number
    Description: string;
    Id: number
    McStatus__Id: string;
    OperationHandoverStatus: string;
    PlannedCompleted: string;
    PlannedStartup: string;
    Responsible__Id: string;
    Status__Id: string;
}

export function TimelineTab() {
    const mapper: GnatTaskMapper<Checklist> = {
        id: "Id",
        end: "PlannedCompleted",
        start: "PlannedStartup",
        progress: (i) => 50,
        name: "CommPkgNo"
    }
    const [tasks, setTasks] = useState<Task[]>([])
    const { data } = useFilteredData<Checklist>()

    useEffect(() => {
        if (data.length > 0) {
            setTasks(createGnatData(data, mapper))
        }
    }, [data])

    return (
        tasks.length > 0 ? <FrappeGantt
            tasks={tasks}
            viewMode={ViewMode.Month}
            onClick={task => console.log(task)}
            onDateChange={(task, start, end) => console.log(task, start, end)}
            onProgressChange={(task, progress) => console.log(task, progress)}
            onTasksChange={tasks => console.log(tasks)}
        /> : <div>No tasks awaitable!</div>
    );
}